import React from 'react';

const SettingSwitch = (props: { text: string; subtext: string }) => {
  return (
    <div className="setting-line">
      <div className="title-box">
        <div className="setting-text">{props.text}</div>
        <div className="setting-description">{props.subtext}</div>
      </div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider rounded"></span>
      </label>
    </div>
  );
};

export default SettingSwitch;
