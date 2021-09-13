import React, { useState, useEffect } from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import {
  SettingSwitch,
  SubSettingCategory,
} from 'renderer/components/settings/Settings';
import Storage from 'renderer/utils/Storage';

interface Props {
  token: HandlerToken;
}

const SettingsModal = ({ token }: Props) => {
  const [settings, setSettings] = useState(undefined as any);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await window.electron.ipcRenderer.settings.getAll();
      setSettings(data);
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  return (
    <div>
      {isLoading ? null : (
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
            }}
          >
            <SubSettingCategory title="Dashboard charts">
              <SettingSwitch
                text="Dynamic scale"
                subtext="The chart's scale adapts dynamically to the data it displays"
                state={{
                  value: settings.dynamicScale,
                  setter: (value) => {
                    settings.dynamicScale = value;
                    setSettings(settings);
                  },
                }}
                defaultValue={settings.dynamicScale}
              />
            </SubSettingCategory>
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
                  window.electron.ipcRenderer.settings.setAll(settings);
                  // update internals in Storage
                  Storage.updateInternals();
                  // close modal
                  ModalHandler.disable(token);
                }}
              >
                Save
              </button>
            </div>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default SettingsModal;
