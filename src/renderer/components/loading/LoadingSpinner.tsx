/* eslint-disable react/static-property-placement */
import React from 'react';

interface Props {
  text?: string;
}

class LoadingSpinner extends React.Component<Props, unknown> {
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
      <div className="Loader-container ld-centered">
        <div className="sk-chase">
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
        </div>
        <span style={{ marginTop: '40px' }}>{text}</span>
      </div>
    );
  }
}

export default LoadingSpinner;
