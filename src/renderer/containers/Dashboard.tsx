import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SideBar from 'renderer/containers/SideBar';
import ModalHandler from 'renderer/components/modals/ModalHandler';

interface Props {
  children: JSX.Element;
  match: any;
  location: any;
  history: any;
}

class Dashboard extends React.Component<Props, {}> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    // debug
    // console.log(this.props.location.pathname)

    const { children } = this.props;
    return (
      <div className="dashboard-wrapper">
        <div className="sidebar-spacer" />
        {children}
        <SideBar tab={children} />
        <ModalHandler />
      </div>
    );
  }
}

export default withRouter(Dashboard);
