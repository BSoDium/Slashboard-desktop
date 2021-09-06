import React from 'react';

const SettingSwitch = (props: {
  text: string;
  subtext: string;
  state?: CompactState;
  defaultValue?: boolean;
}) => {
  const { state, defaultValue, text, subtext } = props;

  return (
    <div className="setting-line">
      <div className="title-box">
        <div className="setting-text">{text}</div>
        <div className="setting-description">{subtext}</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="switch">
        <input
          type="checkbox"
          onChange={(event) => {
            state?.setter(event.target.checked);
          }}
          defaultChecked={defaultValue ?? false}
        />
        <span className="slider rounded" />
      </label>
    </div>
  );
};

SettingSwitch.defaultProps = {
  defaultValue: false,
  state: undefined,
};

export default SettingSwitch;
