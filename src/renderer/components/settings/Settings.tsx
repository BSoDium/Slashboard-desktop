import React from 'react';
import { CompactState } from 'renderer/App';
import { useEffect } from 'react';

const SettingSwitch = (props: {
  text: string;
  subtext: string;
  state?: CompactState;
  defaultValue?: boolean;
}) => {
  const { state, defaultValue } = props;

  useEffect(() => {
    state?.setter(defaultValue ?? false);
  }, [defaultValue]);

  return (
    <div className="setting-line">
      <div className="title-box">
        <div className="setting-text">{props.text}</div>
        <div className="setting-description">{props.subtext}</div>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={(event) => {
            state?.setter(event.target.checked);
          }}
          defaultChecked={defaultValue ?? false}
        />
        <span className="slider rounded"></span>
      </label>
    </div>
  );
};

export default SettingSwitch;
