import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import SettingSwitch from 'renderer/components/settings/Settings';

interface Props {
  token: HandlerToken;
}

const SettingsModal = ({ token }: Props) => {
  return (
    <Modal height="fit-content" width="600px">
      <ModalHeader
        style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
      >
        <h2 className="h-normal h-primary">Settings</h2>
      </ModalHeader>
      <ModalBody
        style={{
          padding: '20px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ paddingBottom: '10px' }}>
          Sorry, there aren&apos;t any customizable things yet
        </h2>
        <h3 style={{ paddingBottom: '20px' }}>
          but here&apos;s a quick demo of what this panel might look like in the
          future
        </h3>
        <SettingSwitch
          text="Load configuration from file"
          subtext="Regularly save configuration to a json file and load it on
                startup"
        />
        <SettingSwitch
          text="Celebrate"
          subtext="Go haywire from time to time"
        />
      </ModalBody>
      <ModalFooter>
        <div className="button-band">
          <button
            type="button"
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
              // window.electron.ipcRenderer.storage.doSomething();
              // close modal
              ModalHandler.disable(token);
            }}
          >
            Save
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default SettingsModal;
