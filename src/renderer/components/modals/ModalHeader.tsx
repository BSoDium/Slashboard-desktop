import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

class ModalHeader extends React.Component<Props, {}> {
  static defaultProps = {
    shadow: false,
  };
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div className="modal-header" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalHeader;
