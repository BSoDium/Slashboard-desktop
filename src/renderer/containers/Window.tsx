import React from 'react';
import TitleBar from 'renderer/components/TitleBar';

interface Props {
  children: JSX.Element;
}

class Window extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div className="window-wrapper">
        <TitleBar />
        {children}
      </div>
    );
  }
}

export default Window;
