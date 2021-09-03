import React from 'react';

interface Props {
  shadow?: boolean;
  height?: string;
  width?: string;
  children?: JSX.Element | JSX.Element[];
}

class Modal extends React.Component<Props, {}> {
  static defaultProps = {
    shadow: false,
    children: null,
  };
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { shadow, children, height, width } = this.props;
    return (
      <div className="modal-mask">
        <div
          className={`modal-wrapper${shadow ? ' md-shadow' : ''}`}
          style={{
            height,
            width,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
