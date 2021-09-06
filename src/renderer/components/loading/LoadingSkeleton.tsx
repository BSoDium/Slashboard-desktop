/* eslint-disable react/static-property-placement */
import React from 'react';

interface Props {
  text?: string;
}

class LoadingSkeleton extends React.Component<Props, unknown> {
  static defaultProps = {
    text: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text } = this.props;
    return (
      <div className="Loader-container">
        <div className="tag t-dark">
          <div className="ld-line-title" />
          <div className="ld-line-subtitle" />
          <div className="ld-spacer">
            <div className="ld-line" />
            <div className="ld-line" />
            <div className="ld-line p-end" />
          </div>
        </div>
        {text}
      </div>
    );
  }
}

export default LoadingSkeleton;
