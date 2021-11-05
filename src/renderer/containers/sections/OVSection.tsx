import React from 'react';
import DeviceInfo from 'renderer/components/stats/info/DeviceInfo';
import CPUChart from 'renderer/components/stats/CPUChart';
import RAMChart from 'renderer/components/stats/RAMChart';
import { SectionProps } from '../SectionSelector';

// eslint-disable-next-line react/prefer-stateless-function
class OVSection extends React.Component<SectionProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: SectionProps) {
    super(props);
  }

  render() {
    const { response } = this.props;
    return (
      <div className="section-content">
        <DeviceInfo data={response.data} />
        <div className="server-stats-charts">
          <div className="chart-group">
            <CPUChart
              coreStates={[response.data.hardware.cpu.global]}
              duration={50}
              title="CPU"
              subtitle="Average load"
              stroke="#2effff"
            />
            <CPUChart
              coreStates={response.data.hardware.cpu.cores}
              duration={50}
              title="CPU"
              subtitle="Core load"
            />
            <RAMChart // I need to somehow merge the memory and cpu charts into one component
              memoryState={response.data.hardware.memory}
              duration={50}
              stroke="#ff2e2e"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OVSection;
