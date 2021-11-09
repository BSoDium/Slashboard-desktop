/* eslint-disable react/no-array-index-key */
import React from 'react';
import ram from 'renderer/assets/hardware/ram.svg';
import gpu from 'renderer/assets/hardware/gpu.svg';
import cpu from 'renderer/assets/hardware/cpu-detailed.svg';

interface Props {
  tempData: {
    cpu: number;
    gpu: number;
    memory: number;
  };
}

const ThermalPanel: React.FC<Props> = ({ tempData }: Props) => {
  // this is a test value
  const input = {
    cpu: [
      {
        name: 'Intel core i5',
        value: 40,
      },
      {
        name: 'Intel core i7',
        value: 43,
      },
    ],
    gpu: [
      {
        name: 'Nvidia GTX 1080',
        value: 51,
      },
      {
        name: 'Nvidia GTX 1070',
        value: 37,
      },
    ],
    memory: [
      {
        name: 'DDR4',
        value: 35,
      },
      {
        name: 'DDR3',
        value: 36,
      },
      {
        name: 'DDR3',
        value: 33,
      },
      {
        name: 'DDR3',
        value: 39,
      },
    ],
  };
  return (
    <div className="section-panel">
      <div className="separator" style={{ margin: '70px' }}>
        <div className="motherboard shadow">
          <div className="hole" />
          <div
            className="hole"
            style={{
              left: 'calc(100% - 10px)',
              transform: 'translateX(-100%)',
            }}
          />
          <div
            className="hole"
            style={{
              top: 'calc(100% - 10px)',
              left: 'calc(100% - 10px)',
              transform: 'translate(-100%, -100%)',
            }}
          />
          <div
            className="hole"
            style={{ top: 'calc(100% - 10px)', transform: 'translateY(-100%)' }}
          />
          <div className="topports">
            <div className="topseparator" />
            <div className="topseparator" />
            <div className="topseparator" />
            <div className="topconnector" />
            <div className="topconnector" />
            <div className="topplug" />
            <div className="topconnector" />
            <div className="topseparator" />
            <div className="topconnector" />
            <div className="topconnector" />
          </div>
          <div className="flex-row">
            <div className="sideports">
              <div className="sideseparator" />
              <div className="sideseparator" />
              <div className="sideseparator" />
              <div className="sideseparator" />
              <div className="sideseparator" />
              <div className="sideconnector" />
              <div className="sideconnector" />
            </div>
            <div className="flex-column">
              {/* GPUs */}
              <div
                className="pcie-slots"
                style={{ height: `${input.gpu.length * 60 + 180}px` }}
              >
                {input.gpu.map((item, index) => (
                  <div className="pcie-slot" key={`${item.name}${index}`}>
                    <img
                      src={gpu}
                      alt="gpu"
                      className="component gpu pull-up"
                    />
                    <div className="pcie-slot-gfx rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex-column"
              style={{ alignItems: 'center', marginLeft: '10px' }}
            >
              {/* CPUs */}
              <div className="flex-row">
                {input.cpu.map((item, index) => (
                  <div className="socket" key={`${item.name}${index}`}>
                    <img
                      src={cpu}
                      alt="cpu"
                      className="component cpu pull-out"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-row">
                {/* RAM sticks */}
                <div
                  className="ram-slots"
                  style={{ height: `${input.memory.length * 30 + 55}px` }}
                >
                  {input.memory.map((item, index) => (
                    <div className="ram-slot" key={`${item.name}${index}`}>
                      <img
                        src={ram}
                        alt="ram"
                        className="component ram pull-up"
                      />
                      <div className="ram-slot-gfx rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalPanel;
