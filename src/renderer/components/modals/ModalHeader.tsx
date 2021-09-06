import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

const ModalHeader = (props: Props) => {
  const { children, style } = props;
  return (
    <div className="modal-header" style={style}>
      {children}
    </div>
  );
};

ModalHeader.defaultProps = {
  children: null,
  style: {},
};

export default ModalHeader;
