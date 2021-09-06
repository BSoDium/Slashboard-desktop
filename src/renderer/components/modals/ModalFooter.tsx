import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

const ModalFooter = (props: Props) => {
  const { children, style } = props;
  return (
    <div className="modal-footer" style={style}>
      {children}
    </div>
  );
};

ModalFooter.defaultProps = {
  children: null,
  style: {},
};

export default ModalFooter;
