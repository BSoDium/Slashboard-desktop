/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { withRouter } from 'react-router-dom';

import CPUChart from 'renderer/components/stats/CPUChart';
import RAMChart from 'renderer/components/stats/RAMChart';
import LoadingSpinner from 'renderer/components/loading/LoadingSpinner';
import DeviceInfo from 'renderer/components/stats/info/DeviceInfo';

import {
  InvalidKey,
  Unresponsive,
  InvalidAPI,
} from 'renderer/components/ContextMessages';

interface State {
  isLoading: boolean;
  bearer: string;
  response: PulsarResponse | undefined;
  fetchFailed: boolean;
}

class ServerStats extends React.Component<any, State> {
  interval!: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      bearer: '',
      response: undefined,
      fetchFailed: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { match } = this.props;
    // fetch the bearer token, then fetch the data
    this.fetchBearer(match.params.ip, match.params.port, match.params.auth)
      .then(() => {
        return this.fetchData(
          match.params.ip,
          match.params.port,
          match.params.auth
        );
      })
      .catch(() => {});

    this.interval = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      const { ip, port, auth } = this.props.match.params;
      this.fetchData(ip, port, auth);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async fetchData(ip: string, port: string, auth: string) {
    const url = `http://${ip}:${port}/status`;
    const { bearer } = this.state;

    const options = {
      method: 'GET',
      headers: new Headers({ authorization: `Bearer ${bearer}` }),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.data.status === 'access denied') {
          this.fetchBearer(ip, port, auth);
          return response;
        }
        this.setState({ response, isLoading: false });
        return response;
      })
      .catch(() => {
        this.setState({ isLoading: false, fetchFailed: true });
      });
  }

  /**
   * Fetches the bearer token from the server.
   */
  async fetchBearer(ip: string, port: string, auth: string) {
    const url = `http://${ip}:${port}/authenticate/jwt`;
    const options = {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        auth,
      }),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ bearer: response.bearer });
        return response;
      })
      .catch(() => {
        this.setState({ bearer: '' });
      });
  }

  render() {
    const { match } = this.props;
    const { isLoading, response, fetchFailed } = this.state;
    const serverTimedOut = isLoading ? undefined : fetchFailed;
    const authFailed =
      !isLoading &&
      !serverTimedOut &&
      response?.data &&
      response?.data.status !== 'active';

    let content: JSX.Element;
    if (serverTimedOut) {
      // server is down or misconfigured, request timed out
      content = <Unresponsive />;
    } else if (authFailed) {
      // wrong key provided, server returned status "access denied"
      content = <InvalidKey />;
    } else if (!isLoading) {
      // response is readable, display stats
      const { ip, port } = match.params;
      try {
        content = (
          <div className="server-stats-wrapper">
            <div className="server-stats-titlebar">
              <div className="title-box">
                <h1>{response?.data.name}</h1>
                <h2>
                  {ip}:{port}
                </h2>
              </div>
            </div>
            <div className="server-stats-content">
              <DeviceInfo data={response?.data!} />
              <div className="server-stats-charts">
                <div className="chart-group">
                  <CPUChart
                    coreStates={[response?.data.hardware.cpu.global!]}
                    duration={50}
                    title="CPU"
                    subtitle="Average load"
                    stroke="#2effff"
                  />
                  <CPUChart
                    coreStates={response?.data.hardware.cpu.cores!}
                    duration={50}
                    title="CPU"
                    subtitle="Core load"
                  />
                  <RAMChart // I need to somehow merge the memory and cpu charts into one component
                    memoryState={response?.data.hardware.memory!}
                    duration={50}
                    stroke="#ff2e2e"
                  />
                  {/* <TempCharts /> */}
                </div>
              </div>
              {/* <Console /> */}
            </div>
          </div>
        );
      } catch (e) {
        // If the fields are missing, then the API is invalid
        content = <InvalidAPI />;
      }
    } else {
      content = <LoadingSpinner text="Fetching data" />;
    }
    return (
      <div className="body-wrapper">
        <div className="body-panel-wrapper shadow">{content}</div>
      </div>
    );
  }
}

export default withRouter(ServerStats);
