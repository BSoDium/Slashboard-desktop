import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ServerList from 'renderer/containers/ServerList';
import SelectType from 'renderer/components/modals/SelectType';
import { ActionMeta, ValueType } from 'react-select';

interface Props {
  token: HandlerToken;
}

interface State {
  showHelp: boolean;
  ip: string;
  port: string;
  auth: string;
  type: string;
}

class AddDeviceModal extends React.Component<Props, State> {
  deviceTypeOptions = [
    { value: 'server', label: 'Server' },
    { value: 'pc', label: 'PC' },
    { value: 'laptop', label: 'Laptop' },
  ];

  constructor(props: Props) {
    super(props);
    this.state = {
      showHelp: false,
      ip: '',
      port: '',
      auth: '',
      type: Object.keys(this.deviceTypeOptions)[0], // default select value
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleInputChange(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  handleSelectChange = (
    value: ValueType<any, any>,
    action: ActionMeta<any>
  ) => {
    this.setState({
      [action.name as string]: value.value,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { token } = this.props;
    const { showHelp, ip, port, auth, type } = this.state;
    return (
      <Modal height="fit-content" width="500px">
        <ModalHeader
          style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
        >
          <h2 className="h-normal h-primary">Add device</h2>
        </ModalHeader>
        <ModalBody
          style={{
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ marginTop: '20px' }}>Networking</h3>
          <input
            type="text"
            id="ip"
            name="ip"
            placeholder="IP address"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            id="port"
            name="port"
            placeholder="Port"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <h3 style={{ marginTop: '40px' }}>
            Authentification&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="sm"
              color="grey"
              cursor="pointer"
              onClick={() => {
                this.setState({ showHelp: true });
              }}
            />
          </h3>
          <input
            type="password"
            id="auth"
            name="auth"
            placeholder="Pairing key"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <div
            className="tag t-dark"
            style={{
              display: showHelp ? 'block' : 'none',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <div className="h-bold h-primary">Where do I find this key ?</div>
            <div className="h-secondary" style={{ marginTop: '10px' }}>
              Pulsar attributes a unique key to your server when running the
              configuration script for the first time. If you did not write it
              down, you can still get it back, but this requires some digging :
              more info on Github.
            </div>
          </div>
          <h3 style={{ marginTop: '20px' }}>Icon</h3>
          <div className="t-select">
            <SelectType
              options={this.deviceTypeOptions}
              onChange={this.handleSelectChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="button-band">
            <button
              type="reset"
              className="btn-empty b-normal"
              onClick={() => {
                // close modal
                ModalHandler.disable(token);
              }}
              style={{ marginRight: '10px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-standard b-primary b-shadow"
              onClick={() => {
                // ipcRenderer bridge
                window.electron.ipcRenderer.storage.addServer(
                  ip,
                  port,
                  auth,
                  type
                );
                // close modal
                ModalHandler.disable(token);
                // update server list
                (token.emitter as ServerList).fetch();
              }}
            >
              Done
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddDeviceModal;
