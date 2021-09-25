import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faMinusCircle,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';

interface State {
  fullscreen: boolean;
}

class TitleBar extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      fullscreen: false, // should be set by electron
    };
  }

  render() {
    const { fullscreen } = this.state;
    return (
      <div
        className="titlebar-wrapper"
        style={{ display: fullscreen ? 'none' : 'auto' }}
      >
        <div className="titlebar-text">Slashboard</div>
        <div className="titlebar-grabber" />
        <div className="titlebar-controls">
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.currentWindow.minimize();
            }}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              className="titlebar-minimize"
            />
          </button>
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.currentWindow.maximize();
            }}
          >
            <FontAwesomeIcon
              icon={faStopCircle}
              className="titlebar-maximize"
            />
          </button>
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.currentWindow.close();
            }}
          >
            <FontAwesomeIcon icon={faTimesCircle} className="titlebar-close" />
          </button>
        </div>
      </div>
    );
  }
}

export default TitleBar;
