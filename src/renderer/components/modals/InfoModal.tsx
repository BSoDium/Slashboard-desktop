import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import logo from 'renderer/assets/Slashboard.svg';
import changelog from 'renderer/changelog';

interface Props {
  token: HandlerToken;
}

interface State {
  appVersion: string;
}

class InfoModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appVersion: '',
    };
  }

  async componentDidMount() {
    const appVersion = await window.electron.ipcRenderer.getVersion();
    this.setState({ appVersion });
  }

  render() {
    const { token } = this.props;
    const { appVersion } = this.state;
    return (
      <Modal height="fit-content" width="550px">
        <ModalHeader
          style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
        >
          <h2 className="h-normal h-primary">About Slashboard</h2>
        </ModalHeader>
        <ModalBody
          style={{
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="spacer">
            <div className="flex-row">
              <img
                src={logo}
                alt="Slashboard-logo"
                style={{ width: '200px', marginRight: '20px' }}
              />
              <div>
                <h2>Slashboard {appVersion}</h2>
                <h3>pre-release</h3>
                <div className="tag t-secondary">
                  <span className="h-bold">Changelog :</span>
                  {changelog}
                </div>
              </div>
            </div>
            <div className="spacer" style={{ marginTop: '20px' }}>
              <div className="tag t-dark">
                <div>
                  <span className="h-bold">Developer</span> : BSoDium (Philippe
                  Négrel-Jerzy)
                  <br />
                  <span className="h-bold">Contact</span> :
                  negreljerzy.philippe@gmail.com
                  <br />
                  Bug reports via Github only
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="button-band">
            <button
              type="button"
              className="btn-standard b-dark"
              onClick={() => {
                // close modal
                ModalHandler.disable(token);
              }}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default InfoModal;
