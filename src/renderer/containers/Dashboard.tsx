import React from 'react';

import SideBar from 'renderer/containers/SideBar';
import { ModalHandler } from 'renderer/components/modals/ModalHandler';

interface Props {
  children: JSX.Element;
}

const Dashboard = (props: Props) => {
  const { children } = props;
  return (
    <div className="dashboard-wrapper">
      <div className="sidebar-spacer" />
      {children}
      <SideBar tab={children} />
      <ModalHandler />
    </div>
  );
};

export default Dashboard;
