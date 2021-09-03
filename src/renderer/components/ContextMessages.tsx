import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faInfoCircle,
  faWifi,
  faLock,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';

const EmptyDashboard = (props: { onClick: () => void }) => {
  return (
    <div className="msg-wrapper">
      <FontAwesomeIcon
        icon={faLightbulb}
        size="8x"
        color="#d4d4d4"
        style={{ paddingBottom: '50px' }}
      />
      <h1>It's empty in here</h1>
      <div style={{ padding: '20px' }}>
        <h2>Populate your dashboard by adding in some new servers</h2>
        <button
          type="button"
          className="btn-standard b-dark"
          style={{ marginTop: '40px' }}
          onClick={props.onClick}
        >
          Let's get started
        </button>
      </div>
    </div>
  );
};

const NoInternet = (props: { onClick: () => void }) => {
  return (
    <div className="msg-wrapper">
      <FontAwesomeIcon
        icon={faWifi}
        size="8x"
        color="#d4d4d4"
        style={{ paddingBottom: '30px' }}
      />
      <h1>Sorry</h1>
      <h2>We couldn't find the internet</h2>
      <div className="tag t-dark" style={{ marginTop: '30px' }}>
        <p style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#d4d4d4"
            style={{ paddingRight: '7px' }}
          />
          Troubleshooting :
        </p>
        <p>
          This error is being displayed because your computer doesn't seem to be
          connected to the internet. In order to display relevant data,
          Slashboard needs a stable internet connection.
        </p>
        <p style={{ color: 'rgb(0, 255, 0)' }}>
          If you're using a wifi connection, try connecting to your router via
          ethernet. If this doesn't work, try rebooting the router.
        </p>
      </div>
      <button
        className="btn-standard b-dark b-shadow"
        style={{ marginTop: '30px' }}
        onClick={props.onClick}
      >
        Ignore
      </button>
    </div>
  );
};

const InvalidKey = () => {
  return (
    <div className="msg-wrapper">
      <FontAwesomeIcon
        icon={faLock}
        size="8x"
        color="#d4d4d4"
        style={{ paddingBottom: '30px' }}
      />
      <h1>Sorry</h1>
      <h2>That key's not gonna work</h2>
      <div className="tag t-dark" style={{ marginTop: '30px' }}>
        <p style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#d4d4d4"
            style={{ paddingRight: '7px' }}
          />
          Troubleshooting :
        </p>
        <p>
          This error is being displayed because the server returned the "access
          denied" status. This generally means that the pairing key is invalid
          and needs to be updated.
        </p>
        <p style={{ color: 'rgb(255, 0, 0)' }}>
          No quick fix is available at the moment. Please file an issue.
        </p>
      </div>
      <Link to="/">
        <button
          className="btn-standard b-dark b-shadow"
          style={{ marginTop: '30px' }}
        >
          Go back
        </button>
      </Link>
    </div>
  );
};

const Unresponsive = () => {
  return (
    <div className="msg-wrapper">
      <FontAwesomeIcon
        icon={faHeartBroken}
        size="8x"
        color="#d4d4d4"
        style={{ paddingBottom: '30px' }}
      />
      <h1>Woops...</h1>
      <h2>Your server is unresponsive</h2>
      <div className="tag t-dark" style={{ marginTop: '30px' }}>
        <p style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#d4d4d4"
            style={{ paddingRight: '7px' }}
          />
          Troubleshooting :
        </p>
        <p>
          This error is being displayed because the server failed to answer the
          client's request. It might be due either to a broken connection
          between the client and the server, or to the Pulsar service having
          stopped working.
        </p>
        <p style={{ color: 'rgb(0, 255, 0)' }}>
          Try rebooting the server. If this doesn't work, try reinstalling
          Pulsar.
        </p>
      </div>
      <Link to="/">
        <button
          className="btn-standard b-dark b-shadow"
          style={{ marginTop: '30px' }}
        >
          Go back
        </button>
      </Link>
    </div>
  );
};

export { EmptyDashboard, NoInternet, InvalidKey, Unresponsive };
