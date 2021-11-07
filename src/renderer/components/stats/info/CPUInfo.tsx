import React from 'react';

import cpu from 'renderer/assets/hardware/cpu.svg'; // Adib Sulthon

interface Props {
  data: PulsarResponse['data']['hardware']['cpu'];
}

const CPUInfo = ({ data }: Props) => {
  return (
    <div className="section-panel" style={{ gridArea: 'cpu' }}>
      <div className="flex-row">
        <img
          src={cpu}
          alt="cpu"
          className="display-icon section-panel-description"
        />
        <div className="section-panel-description">
          <div className="t-impact">{data.cores.length}</div>
          <h3>Cores</h3>
        </div>
        <div className="section-panel-description">
          <div className="t-impact">
            {(data.global.speed / 1000).toFixed(2)}
          </div>
          <h3>Ghz</h3>
        </div>
        <div className="section-panel-description">
          <div className="t-impact">{Math.round(data.global.load)} %</div>
          <h3>Load average</h3>
        </div>
      </div>
      <div className="section-panel-description">
        <h2 style={{ color: '#fff', fontFamily: 'cairo' }}>
          {data.global.model}
        </h2>
        <h3>Central Processing Unit</h3>
      </div>
    </div>
  );
};

export default CPUInfo;
