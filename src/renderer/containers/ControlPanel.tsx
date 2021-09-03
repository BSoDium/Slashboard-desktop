import React from 'react';

import ServerList from 'renderer/containers/ServerList';
import { CompactState } from 'renderer/App';

interface Props {
  offline: CompactState;
}

class ControlPanel extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { offline } = this.props;
    return (
      <div className="body-wrapper">
        <ServerList offline={offline} />
        {/* there should also be a DeviceList element in a future update */}
      </div>
    );
  }
}

export default ControlPanel;
