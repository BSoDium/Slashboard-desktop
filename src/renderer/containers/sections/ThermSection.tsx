import React from 'react';
import ThermalPanel from 'renderer/components/thermal/ThermalPanel';
import { SectionProps } from '../SectionSelector';

// eslint-disable-next-line react/prefer-stateless-function
class ThermSection extends React.Component<SectionProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: SectionProps) {
    super(props);
  }

  render() {
    return (
      <div className="section-content">
        <ThermalPanel
          tempData={{
            cpu: 45,
            gpu: 55,
            memory: 65,
          }}
        />
      </div>
    );
  }
}

export default ThermSection;
