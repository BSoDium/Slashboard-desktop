import React from 'react';

import ServerList from 'renderer/containers/ServerList';

interface Props {
  offline: CompactState;
}

const ControlPanel = ({ offline }: Props) => {
  return (
    <div className="body-wrapper">
      <ServerList offline={offline} />
      {/* there should also be a DeviceList element in a future update */}
    </div>
  );
};

export default ControlPanel;
