/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';

import LoadingSpinner from 'renderer/components/loading/LoadingSpinner';
import SectionSelector from 'renderer/containers/SectionSelector';
import {
  InvalidKey,
  Unresponsive,
  InvalidAPI,
} from 'renderer/components/ContextMessages';
import { statusColorMap } from '../components/Server';
import OVSection from './sections/OVSection';
import PerfSection from './sections/PerfSection';
import ThermSection from './sections/ThermSection';
import SSHSection from './sections/SSHSection';

interface MatchParams {
  ip: string;
  port: string;
  auth: string;
}

interface State {
  isLoading: boolean;
  bearer: string;
  response: PulsarResponse | undefined;
  fetchFailed: boolean;
  responseTime: number;
}

class ServerOV extends React.Component<
  RouteComponentProps<MatchParams>,
  State
> {
  interval!: NodeJS.Timeout;

  responseTimeOptimum: number;

  root: string;

  constructor(props: RouteComponentProps<MatchParams>) {
    super(props);
    this.state = {
      isLoading: true,
      bearer: '',
      response: undefined,
      fetchFailed: false,
      responseTime: 0,
    };
    this.responseTimeOptimum = 60; // change this when updating the API, the fetch call's length may vary
    this.root = '';
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { match, history, location } = this.props;
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

    // fetch the data every delta ms
    const delta = 1000; // ms (should be set by the settings)
    this.interval = setInterval(() => {
      const { ip, port, auth } = match.params;
      this.fetchData(ip, port, auth);
    }, delta);

    // save the current path as the root path
    this.root = location.pathname;

    // load the Overview page
    history.push(`${location.pathname}/overview`);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Fetches the data from the server.
   * @param ip The IP address of the server.
   * @param port The port of the server.
   * @param auth The authentication key.
   * @param retryOnFailure Whether to retry the fetch if it fails. Defaults to true.
   * @param suffix The suffix to append to the URL. Defaults to 'status'.
   */
  fetchData(
    ip: string,
    port: string,
    auth: string,
    retryOnFailure = true,
    suffix = 'status'
  ) {
    const url = `http://${ip}:${port}/${suffix}`;
    const { bearer } = this.state;

    const options = {
      method: 'GET',
      headers: new Headers({ authorization: `Bearer ${bearer}` }),
    };

    const start = Date.now();

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.data?.status === 'access denied' && retryOnFailure) {
          this.fetchBearer(ip, port, auth, () => {
            this.fetchData(ip, port, auth, false);
          });
          return response;
        }
        const responseTime = Date.now() - start;
        this.setState({ response, isLoading: false, responseTime });
        return response;
      })
      .catch(() => {
        this.setState({ isLoading: false, fetchFailed: true });
      });
  }

  /**
   * Fetches the bearer token from the server.
   * @param ip The IP address of the server.
   * @param port The port of the server.
   * @param auth The authentication key.
   */
  async fetchBearer(
    ip: string,
    port: string,
    auth: string,
    callback?: () => void
  ) {
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
      })
      .then(callback || (() => {}));
  }

  render() {
    const { match } = this.props;
    const { isLoading, response, fetchFailed, responseTime } = this.state;
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
              <div
                className="flex-row"
                style={{ maxWidth: '500px', overflow: 'hidden' }}
              >
                <div className="flex-column" style={{ marginRight: '10px' }}>
                  <h1>{response?.data.name}</h1>
                  <h2>
                    {ip}:{port}
                  </h2>
                </div>
                <div className="header-block">
                  <h2>Status</h2>
                  <h3
                    style={{
                      color: statusColorMap[response?.data.status || ''],
                    }}
                    className="h-bold"
                  >
                    {response?.data.status}
                  </h3>
                </div>
                <div className="header-block">
                  <h2>Response time</h2>
                  <h3
                    style={{
                      color: `rgb(${
                        255 *
                        (1 -
                          Math.exp(
                            (Math.log(0.9) / this.responseTimeOptimum) *
                              responseTime
                          ))
                      } , ${
                        255 *
                        Math.exp(
                          (Math.log(0.9) / this.responseTimeOptimum) *
                            responseTime
                        )
                      }, ${
                        136 *
                        Math.exp(
                          (Math.log(0.9) / this.responseTimeOptimum) *
                            responseTime
                        )
                      })`,
                    }}
                    className="h-bold"
                  >
                    {responseTime} ms
                  </h3>
                </div>
              </div>
              <SectionSelector root={this.root} />
            </div>
            <Route path={`${match.path}/overview`}>
              <OVSection response={response!} fetchData={this.fetchData} />
            </Route>
            <Route path={`${match.path}/performance`}>
              <PerfSection response={response!} fetchData={this.fetchData} />
            </Route>
            <Route path={`${match.path}/thermal`}>
              <ThermSection response={response!} fetchData={this.fetchData} />
            </Route>
            <Route path={`${match.path}/ssh`}>
              <SSHSection response={response!} fetchData={this.fetchData} />
            </Route>
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

export default withRouter(ServerOV);
