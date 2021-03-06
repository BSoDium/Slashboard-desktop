/* eslint-disable import/no-cycle */
import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { Server } from 'renderer/components/Server';

interface Props {
  token: HandlerToken;
}

const DelDeviceModal = ({ token }: Props) => {
  return (
    <Modal height="fit-content" width="600px">
      <ModalHeader
        style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
      >
        <h2 className="h-normal h-primary">Delete device</h2>
      </ModalHeader>
      <ModalBody
        style={{
          padding: '20px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        Are you sure you want to delete this device ?
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
            className="btn-standard b-danger b-shadow"
            onClick={() => {
              const emitter = token.emitter as Server;
              // ipcRenderer bridge
              window.electron.ipcRenderer.servers.del(emitter.getId());
              // close modal
              ModalHandler.disable(token);
              // update server list
              emitter.props.listRefresh();
            }}
          >
            Delete
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default DelDeviceModal;
