import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

class ModalBody extends React.Component<Props, {}> {
  static defaultProps = {
    shadow: false,
  };
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div className="modal-body" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
