import React from 'react';
import hdd from 'renderer/assets/hardware/hdd.svg'; // Smashicons
import cpu from 'renderer/assets/hardware/cpu.svg'; // Adib Sulthon
import windows from 'renderer/assets/os/windows.svg'; // Freepik
import linux from 'renderer/assets/os/linux.svg'; // Freepik
import apple from 'renderer/assets/os/apple.svg'; // Freepik
import osDefault from 'renderer/assets/os/os-default.svg'; // Nikita Golubev

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHdd, faEthernet } from '@fortawesome/free-solid-svg-icons';

const osIcons: { [key: string]: any } = {
  win32: windows,
  win64: windows,
  linux: linux,
  darwin: apple,
};

const diskBlockSize: { [key: string]: number } = {
  win32: 1, // just windows being a stupid
  linux: 1024,
  darwin: 1024,
};

const fsExclude: RegExp[] = [/tmpfs/gm, /udev/gm, /\/dev\/loop[0-9]+/gm];

interface Props {
  data: PulsarResponse['data'];
}

export default class DeviceInfo extends React.Component<Props, {}> {
  render() {
    const { data } = this.props;
    return (
      <div className="hardware" style={{ gridArea: 'cpu' }}>
        <div className="hardware-component">
          <div className="flex-row">
            <img
              src={cpu}
              alt="cpu"
              className="display-icon hardware-component-description"
            />
            <div className="hardware-component-description">
              <div className="t-impact">{data.hardware.cpu.cores.length}</div>
              <h3>Cores</h3>
            </div>
            <div className="hardware-component-description">
              <div className="t-impact">
                {(data.hardware.cpu.global.speed / 1000).toFixed(2)}
              </div>
              <h3>Ghz</h3>
            </div>
            <div className="hardware-component-description">
              <div className="t-impact">
                {Math.round(data.hardware.cpu.global.load)} %
              </div>
              <h3>Load average</h3>
            </div>
          </div>
          <div className="hardware-component-description">
            <h2 style={{ color: '#fff', fontFamily: 'cairo' }}>
              {data.hardware.cpu.global.model}
            </h2>
            <h3>Central Processing Unit</h3>
          </div>
        </div>

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
            <h2 style={{ marginLeft: '20px' }}>Network interfaces</h2>
            <div className="explorer" style={{ maxHeight: '250px' }}>
              {Object.values(data.hardware.network.interfaces).map(
                (iface: NetworkInterface[], i) => (
                  <div key={i} className="explorer-item">
                    <FontAwesomeIcon icon={faEthernet} size="2x" />
                    <div className="explorer-item-description">
                      <div className="t-impact-min">
                        {Object.keys(data.hardware.network.interfaces)[i]}
                      </div>
                      <h3>Name</h3>
                    </div>
                    <div className="explorer-item-description">
                      <h2>{iface[1].address}</h2>
                      <h3>IP</h3>
                    </div>
                    <div className="explorer-item-description">
                      <h2>{iface[1].mac}</h2>
                      <h3>MAC</h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="hardware-component" style={{ gridArea: 'disk' }}>
          <div className="flex-row">
            <img
              src={hdd}
              alt="hdd"
              className="display-icon hardware-component-description"
            />
            <div className="hardware-component-description">
              <div className="t-impact">{data.hardware.disks.length}</div>
              <h3>Disks mounted</h3>
            </div>
          </div>
          <div className="explorer" style={{ maxHeight: '510px' }}>
            {data.hardware.disks.map(
              (
                disk: {
                  _filesystem: string;
                  _blocks: number;
                  _used: number;
                  _available: number;
                  _capacity: string;
                  _mounted: string;
                },
                index
              ) => {
                if (fsExclude.some((regex) => regex.test(disk._filesystem))) {
                  return null;
                }
                return (
                  <div key={index} className="explorer-item">
                    <FontAwesomeIcon icon={faHdd} size="2x" />
                    <div className="explorer-item-description">
                      <div className="t-impact-min">{disk._mounted}</div>
                      <h3>Mount</h3>
                    </div>
                    <div className="explorer-item-description">
                      <h2>
                        {(
                          (disk._blocks * diskBlockSize[data.os.platform]) /
                          1024 /
                          1024 /
                          1024
                        ).toFixed(2)}{' '}
                        GB
                      </h2>
                      <h3>Size</h3>
                    </div>
                    <div className="explorer-item-description">
                      <h2>{disk._capacity}</h2>
                      <h3>Used storage</h3>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
