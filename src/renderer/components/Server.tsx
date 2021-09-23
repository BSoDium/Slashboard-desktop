/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSkeleton from 'renderer/components/loading/LoadingSkeleton';
import serverIcon from 'renderer/assets/hardware/server.svg';
import pcIcon from 'renderer/assets/hardware/pc.svg';
import phoneIcon from 'renderer/assets/hardware/laptop.svg';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';
import DelDeviceModal from 'renderer/components/modals/DelDeviceModal';
import EditDeviceModal from 'renderer/components/modals/EditDeviceModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faSync } from '@fortawesome/free-solid-svg-icons';

const statusColorMap: { [key: string]: string } = {
  active: '#00ff88',
  'access denied': 'rgb(226, 178, 19)',
  down: '#ff001e',
};

const icons: { [key: string]: string } = {
  server: serverIcon,
  pc: pcIcon,
  laptop: phoneIcon,
};

interface Props {
  data: any;
  id: string;
  listRefresh: () => void;
  location: any;
  match: any;
  history: any;
}

interface State {
  isLoading: boolean;
  response: any;
  showMenu: boolean;
}

class Server extends React.Component<Props, State> {
  delModal: HandlerToken | undefined;

  editModal: HandlerToken | undefined;

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      response: null,
      showMenu: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.delModal = ModalHandler.push(DelDeviceModal, this);
    this.editModal = ModalHandler.push(EditDeviceModal, this);
    this.fetchData();
  }

  getId(): string {
    const { id } = this.props;
    return id;
  }

  getData(): any {
    const { data } = this.props;
    return data;
  }

  fetchData() {
    const { data } = this.props;
    const url = `http://${data.ip}:${data.port}/${data.auth}/status-compact`;
    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ response, isLoading: false });
        return response;
      })
      .catch(() => {
        this.setState({ response: 'none', isLoading: false });
      });
  }

  render() {
    const { isLoading, response, showMenu } = this.state;
    const { data, history } = this.props;

    const handleClick = () => {
      history.push(`/dashboard/servers/${data.ip}-${data.port}-${data.auth}`);
    };

    const fetchSuccess = !isLoading && response !== 'none' && (
      <div className="tag t-dark">
        <div
          style={{
            color: '#5493ff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {response.data?.name ? response.data.name : 'Unknown'}
        </div>
        <div>
          status :{' '}
          <span
            style={{
              color: statusColorMap[response.data?.status]
                ? statusColorMap[response.data.status]
                : '#f55840',
              fontWeight: 'bold',
            }}
          >
            {response.data?.status ? response.data.status : 'incompatible API'}
          </span>
        </div>
        <div>
          operating system :&nbsp;
          {response.data?.os ? (
            <>
              {response.data.os.type}&nbsp;
              {response.data.os.architecture}&nbsp;build&nbsp;
              {response.data.os.release}
            </>
          ) : (
            'unable to retrieve'
          )}
        </div>
      </div>
    );

    // response === 'none' ? (
    const fetchFailed = !isLoading && (
      <div className="tag t-dark">
        <div
          style={{
            color: 'red',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Connection timeout
        </div>
        <div>
          status :{' '}
          <span style={{ color: '#f44336', fontWeight: 'bold' }}>down</span>
        </div>
        <div>Server is either misconfigured or inactive</div>
        <div className="tooltip" style={{ marginTop: '5px' }}>
          An inactive server might be down for maintenance or under heavy load.
          <br />
          If this problem persists, check your Pulsar configuration.
        </div>
      </div>
    );

    const fetchFinished =
      response === 'none'
        ? // fetch failed
          fetchFailed
        : // fetch success
          fetchSuccess;

    return (
      <div
        className="server-wrapper"
        onMouseEnter={() => {
          this.setState({ showMenu: true });
        }}
        onMouseLeave={() => {
          this.setState({ showMenu: false });
        }}
      >
        <img
          src={icons[data.type]}
          className="server-icon"
          alt="serverIcon"
          onClick={handleClick}
          onKeyDown={handleClick}
        />
        <div className="server-details">
          <div className="server-details-header">
            <h2>
              <span style={{ color: '#00ffb3' }}>{data.ip}</span>:
              <span style={{ color: '#00eaff' }}>{data.port}</span>
            </h2>
            {showMenu && (
              <div className="server-menu">
                <button
                  type="button"
                  className="btn-empty b-small"
                  onClick={this.fetchData}
                >
                  <FontAwesomeIcon icon={faSync} />
                </button>
                <button
                  type="button"
                  className="btn-empty b-small"
                  onClick={() => {
                    ModalHandler.enable(this.editModal!);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  type="button"
                  className="btn-empty b-small"
                  onClick={() => {
                    ModalHandler.enable(this.delModal!);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            // fetch is in progress
            <LoadingSkeleton />
          ) : (
            // fetch is complete
            fetchFinished
          )}
        </div>
        <div className="anchor">
          <div className="server-actions" />
        </div>
      </div>
    );
  }
}

export default withRouter(Server);
export { Server };
