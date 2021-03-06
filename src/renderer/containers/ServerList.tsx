import React from 'react';
import moment from 'moment';

import ServerWithRouter from 'renderer/components/Server';
// eslint-disable-next-line import/no-cycle
import AddDeviceModal from 'renderer/components/modals/AddDeviceModal';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  EmptyDashboard,
  NoInternet,
} from 'renderer/components/ContextMessages';
import Storage from 'renderer/utils/Storage';

interface Props {
  offline: CompactState;
}

interface State {
  servers: StorageFormat['servers'] | never[];
  lastUpdated: Date;
  timeSinceLastUpdate: string;
  isLoading: boolean;
}

class ServerList extends React.Component<Props, State> {
  interval!: NodeJS.Timeout;

  addModal: HandlerToken | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      servers: [],
      lastUpdated: new Date(),
      timeSinceLastUpdate: 'now',
      isLoading: true,
    };

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    // push modal to ModalHandler
    this.addModal = ModalHandler.push(AddDeviceModal, this);

    // fetch server list on component mount
    this.fetch();
    // update "Last fetched :" text and server list every 5000 ms
    this.interval = setInterval(async () => {
      const { lastUpdated } = this.state;
      this.setState({
        timeSinceLastUpdate: moment(lastUpdated).fromNow(),
      });
    }, 5000);
  }

  componentWillUnmount() {
    // clear interval before unmounting
    clearInterval(this.interval);
  }

  fetch() {
    Storage.updateServers(() => {
      this.setState({
        servers: Storage.servers,
        lastUpdated: new Date(),
        timeSinceLastUpdate: 'now',
        isLoading: false,
      });
    });
  }

  render() {
    const { servers, timeSinceLastUpdate, lastUpdated, isLoading } = this.state;
    const { offline } = this.props;
    return (
      <div className="body-panel-wrapper shadow">
        {navigator.onLine || offline.value ? (
          <>
            <div className="list-titlebar-transparent">
              <div className="layout-btn-box">
                <h1>Servers</h1>
                <button
                  type="button"
                  className="btn-standard b-dark"
                  style={{ marginLeft: '20px' }}
                  onClick={() => {
                    ModalHandler.enable(this.addModal!);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="sm"
                    style={{
                      paddingRight: '10px',
                    }}
                  />
                  Add
                </button>
              </div>
              <div className="layout-btn-box">
                <div className="tooltip" style={{ marginRight: '15px' }}>
                  Last fetched : {timeSinceLastUpdate}
                </div>
                <button
                  type="button"
                  className="btn-flat"
                  onClick={() => {
                    this.fetch();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSync}
                    style={{ paddingRight: '10px' }}
                  />
                  Reload
                </button>
              </div>
            </div>
            <div className="list-content">
              {!isLoading &&
                (Object.values(servers).length ? (
                  Object.values(servers).map((serverData, i) => {
                    const id = Object.keys(servers)[i];
                    return (
                      <ServerWithRouter
                        key={`${id}-${lastUpdated.getTime()}`}
                        data={serverData}
                        id={id}
                        listRefresh={this.fetch}
                      />
                    );
                  })
                ) : (
                  <EmptyDashboard
                    onClick={() => {
                      ModalHandler.enable(this.addModal!);
                    }}
                  />
                ))}
            </div>
          </>
        ) : (
          <NoInternet
            onClick={() => {
              offline.setter(true);
            }}
          />
        )}
      </div>
    );
  }
}

export default ServerList;
