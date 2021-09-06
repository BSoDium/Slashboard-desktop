import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

const ModalBody = (props: Props) => {
  const { children, style } = props;
  return (
    <div className="modal-body" style={style}>
      {children}
    </div>
  );
};

ModalBody.defaultProps = {
  children: null,
  style: {},
};

export default ModalBody;
