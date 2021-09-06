import React from 'react';
import TitleBar from 'renderer/components/TitleBar';

interface Props {
  children: JSX.Element;
}

const Window = (props: Props) => {
  const { children } = props;
  return (
    <div className="window-wrapper">
      <TitleBar />
      {children}
    </div>
  );
};

export default Window;
