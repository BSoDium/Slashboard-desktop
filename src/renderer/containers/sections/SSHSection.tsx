import React from 'react';
import { SectionProps } from '../SectionSelector';

// eslint-disable-next-line react/prefer-stateless-function
class SSHSection extends React.Component<SectionProps> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: SectionProps) {
    super(props);
  }

  render() {
    return <div className="section-content">This is the SSH panel</div>;
  }
}

export default SSHSection;
