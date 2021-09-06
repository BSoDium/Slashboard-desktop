import React from 'react';

interface Props {
  shadow?: boolean;
  height?: string;
  width?: string;
  children?: JSX.Element | JSX.Element[];
}

const Modal = (props: Props) => {
  const { shadow, children, height, width } = props;
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
};

Modal.defaultProps = {
  shadow: false,
  children: null,
  height: 'auto',
  width: 'auto',
};

export default Modal;
