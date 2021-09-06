import React from 'react';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
  // const { authSuccess } = this.props.location.state || false;

  // atm the login page is skipped because the backend isn't ready
  const authSuccess = true;

  return authSuccess ? (
    <Redirect to="dashboard/servers" />
  ) : (
    <Redirect to="login" />
  );
};

export default HomePage;
