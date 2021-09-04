import React from 'react';
import windows from 'renderer/assets/os/windows.svg'; // Freepik
import linux from 'renderer/assets/os/linux.svg'; // Freepik
import apple from 'renderer/assets/os/apple.svg'; // Freepik
import osDefault from 'renderer/assets/os/os-default.svg'; // Nikita Golubev

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

import CPUInfo from './CPUInfo';
import DiskInfo from './DiskInfo';

const osIcons: { [key: string]: any } = {
  win32: windows,
  win64: windows,
  linux: linux,
  darwin: apple,
};

interface Props {
  data: PulsarResponse['data'];
}

export default class DeviceInfo extends React.Component<Props, {}> {
  render() {
    const { data } = this.props;
    return (
      <div className="hardware">
        <CPUInfo data={data.hardware.cpu} />
        <DiskInfo disks={data.hardware.disks} os={data.os} />

        <div className="hardware-component" style={{ gridArea: 'os' }}>
          <div className="flex-row">
            <img
              src={osIcons[data.os.platform] || osDefault}
              alt="os-icon"
              className="display-icon hardware-component-description"
              style={{ marginLeft: '30px' }}
            />
            <div className="hardware-component-description">
              <h2 className="t-impact-min">
                {data.os.type} {data.os.architecture}
              </h2>
              <h3>Build {data.os.release}</h3>
            </div>
            <div className="hardware-component-description">
              <h2 className="t-impact-min">
                {(data.os.uptime / 60 / 60).toFixed(1)} hours
              </h2>
              <h3>uptime</h3>
            </div>
          </div>
          <div className="hardware-component-description">
            <div style={{ marginLeft: '10px' }}>
              <h3 className="h-bold h-primary">Network</h3>
              <h3 className="h-light h-secondary">
                Available network interfaces
              </h3>
            </div>

            <div className="explorer" style={{ maxHeight: '250px' }}>
              {Object.values(data.hardware.network.interfaces).map(
                (iface: NetworkInterface[], i) => (
                  <div key={i} className="explorer-item">
                    <FontAwesomeIcon icon={faPlug} size="2x" />
                    <div className="explorer-item-description">
                      <div className="t-impact-min">
                        {Object.keys(data.hardware.network.interfaces)[i]}
                      </div>
                      <h3>Name</h3>
                    </div>
                    <div className="explorer-item-description">
                      <h2>{iface[0].address}</h2>
                      <h3>IP</h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
