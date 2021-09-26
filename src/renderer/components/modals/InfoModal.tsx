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

interface Props {
  token: HandlerToken;
}

interface State {
  appVersion: string;
  changelog: string[];
}

class InfoModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appVersion: '',
      changelog: ['Fetching...'],
    };
  }

  async componentDidMount() {
    const appVersion = await window.electron.ipcRenderer.getVersion();
    this.setState({ appVersion });
    this.fetchChangelog(appVersion);
  }

  fetchChangelog(version: string) {
    const url = `https://api.github.com/repos/l3alr0g/Slashboard-desktop/releases/tags/v${version}`;

    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return { body: '' };
      })
      .then((json) => {
        const keyword = 'Changelog';
        const { body } = json;
        // split the markdown categories into an array
        const categories = body.split('## ');
        // find the category which starts with "changelog"
        const changelog = categories
          .find((category: string) => {
            return category.startsWith(keyword);
          })
          .substring(keyword.length + 3)
          .split('-');
        this.setState({ changelog: changelog || ['Not available'] });
        return json;
      })
      .catch(() => {
        this.setState({ changelog: ['Failed to fetch'] });
      });
  }

  render() {
    const { token } = this.props;
    const { appVersion, changelog } = this.state;
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
                <h3>desktop client</h3>
                <div className="tag t-secondary">
                  <span className="h-bold">Changelog :</span>

                  {changelog.length > 1 ? (
                    <ul>
                      {changelog.map((item: string, index: number) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <li key={item.length * index}>{item}</li>;
                      })}
                    </ul>
                  ) : (
                    changelog[0]
                  )}
                </div>
              </div>
            </div>
            <div className="spacer" style={{ marginTop: '20px' }}>
              <div className="tag t-dark">
                <div>
                  <span className="h-bold">Developer</span> : l3alr0g (Philippe
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
