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

const ThermalPanel: React.FC<Props> = ({ tempData }: Props) => (
  <div className="section-panel">
    <div className="separator" style={{ marginLeft: '20px' }}>
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
          <div className="pcie-slots">
            <div className="pcie-slot">
              <img src={gpu} alt="gpu" className="component gpu pull-up" />
              <div className="pcie-slot-gfx rounded" />
            </div>
            <div className="pcie-slot">
              <img src={gpu} alt="gpu" className="component gpu pull-up" />
              <div className="pcie-slot-gfx rounded" />
            </div>
          </div>
          <div className="flex-column" style={{ alignItems: 'center' }}>
            <div className="socket">
              <img src={cpu} alt="cpu" className="component cpu pull-out" />
            </div>
            <div className="ram-slots">
              <div className="ram-slot">
                <img src={ram} alt="ram" className="component ram pull-up" />
                <div className="ram-slot-gfx rounded" />
              </div>
              <div className="ram-slot">
                <img src={ram} alt="ram" className="component ram pull-up" />
                <div className="ram-slot-gfx rounded" />
              </div>
              <div className="ram-slot">
                <img src={ram} alt="ram" className="component ram pull-up" />
                <div className="ram-slot-gfx rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ThermalPanel;
