import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faEye,
  faTachometerAlt,
  faThermometerHalf,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface SectionProps {
  response: PulsarResponse;
  fetchData: (
    ip: string,
    port: string,
    auth: string,
    retryOnFailure: boolean,
    suffix: string
  ) => void;
}

interface SectionButtonProps {
  icon: IconDefinition;
  text: string;
  onClick: () => void;
  focused: boolean;
  disabled?: boolean;
}

const SectionButton = ({
  icon,
  text,
  onClick,
  focused,
  disabled = false, // TODO : this does nothing atm
}: SectionButtonProps): JSX.Element => {
  return (
    <div>
      {disabled ? null : (
        <button
          className={`section-button${focused ? '-active' : ''} b-rounded`}
          type="button"
          onClick={onClick}
        >
          <FontAwesomeIcon
            icon={icon}
            className="section-button-icon"
            fixedWidth
            size="lg"
            color="white"
          />
          <div className="section-button-text">{text}</div>
        </button>
      )}
    </div>
  );
};

SectionButton.defaultProps = {
  disabled: false,
};

interface Props extends RouteComponentProps {
  root: string; // the root of the url
}

const SectionSelector = ({ root, history, location }: Props): JSX.Element => {
  return (
    <div className="section-selector">
      <SectionButton
        icon={faEye}
        text="Overview"
        focused={location.pathname === `${root}/overview`}
        onClick={() => {
          history.push(`${root}/overview`);
        }}
      />
      <SectionButton
        icon={faTachometerAlt}
        text="Performance"
        focused={location.pathname === `${root}/performance`}
        onClick={() => {
          history.push(`${root}/performance`);
        }}
      />
      <SectionButton
        icon={faThermometerHalf}
        text="Thermal"
        focused={location.pathname === `${root}/thermal`}
        onClick={() => {
          history.push(`${root}/thermal`);
        }}
      />
      <SectionButton
        icon={faTerminal}
        text="SSH"
        focused={location.pathname === `${root}/ssh`}
        onClick={() => {
          history.push(`${root}/ssh`);
        }}
      />
    </div>
  );
};

export default withRouter(SectionSelector);
export { SectionProps };
