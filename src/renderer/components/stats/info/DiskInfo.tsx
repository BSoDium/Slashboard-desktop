/* eslint-disable no-underscore-dangle */
import React from 'react';
import hdd from 'renderer/assets/hardware/hdd.svg'; // Smashicons

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHdd } from '@fortawesome/free-solid-svg-icons';

import { SettingSwitch } from 'renderer/components/settings/Settings';

const diskBlockSize: { [key: string]: number } = {
  win32: 1, // just windows being a stupid
  linux: 1024,
  darwin: 1024,
};

const fsExclude: RegExp[] = [
  /tmpfs/im,
  /udev/im,
  /overlay/im,
  /\/dev\/loop[0-9]+/im,
];

interface Props {
  disks: PulsarResponse['data']['hardware']['disks'];
  os: PulsarResponse['data']['os'];
}

interface State {
  excludeVolatileDisks: boolean;
}

export default class DiskInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      excludeVolatileDisks: true,
    };
  }

  render() {
    const { disks, os } = this.props;
    const { excludeVolatileDisks } = this.state;
    return (
      <div className="section-panel" style={{ gridArea: 'disk' }}>
        <div className="flex-row">
          <img
            src={hdd}
            alt="hdd"
            className="display-icon section-panel-description"
          />
          <div className="section-panel-description">
            <div className="t-impact">
              {disks.reduce(
                (a, disk) =>
                  a +
                  (excludeVolatileDisks &&
                  fsExclude.some((regex) => disk._filesystem.match(regex))
                    ? 0
                    : 1),
                0
              )}
            </div>
            <h3>Disks mounted</h3>
          </div>
          <div className="section-panel-description">
            <div className="t-impact">
              {(
                disks.reduce(
                  (a, disk) =>
                    a +
                    (excludeVolatileDisks &&
                    fsExclude.some((regex) => disk._filesystem.match(regex))
                      ? 0
                      : disk._blocks * diskBlockSize[os.platform]),
                  0
                ) /
                1024 /
                1024 /
                1024
              ).toFixed(2)}
            </div>
            <h3>Total available space (GB)</h3>
          </div>
        </div>
        <div style={{ margin: '0px 0px 20px 40px', width: '50%' }}>
          <SettingSwitch
            text="Exclude volatile memory disks"
            subtext="Exclude filesystems such as udev or tempfs"
            state={{
              value: excludeVolatileDisks,
              setter: (value) => this.setState({ excludeVolatileDisks: value }),
            }}
            defaultValue={excludeVolatileDisks}
          />
        </div>
        <div className="explorer" style={{ maxHeight: '510px' }}>
          {disks.map(
            (disk: {
              _filesystem: string;
              _blocks: number;
              _used: number;
              _available: number;
              _capacity: string;
              _mounted: string;
            }) => {
              if (
                excludeVolatileDisks &&
                fsExclude.some((regex) => disk._filesystem.match(regex))
              ) {
                return null;
              }
              return (
                <div key={disk._mounted} className="explorer-item-large">
                  <FontAwesomeIcon icon={faHdd} size="2x" />
                  <div className="explorer-item-description">
                    <div className="t-impact-min">{disk._mounted}</div>
                    <h3>Mount</h3>
                  </div>
                  <div className="explorer-item-description">
                    <h2>
                      {(
                        (disk._blocks * diskBlockSize[os.platform]) /
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
    );
  }
}
