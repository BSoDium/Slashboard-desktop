import React from 'react';
import DeviceInfo from 'renderer/components/stats/info/DeviceInfo';
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
      </div>
    );
  }
}

export default OVSection;
