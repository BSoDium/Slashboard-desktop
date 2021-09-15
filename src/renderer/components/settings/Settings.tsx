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

const SettingCategory = (props: {
  title: string;
  children?: React.ReactNode;
}) => {
  const { title, children } = props;

  return (
    <div className="setting-category">
      <div
        className="title-box"
        style={{
          padding: '5px 0px',
          marginBlockEnd: '20px',
        }}
      >
        <h2 className="h-bold h-primary">{title}</h2>
      </div>
      {children}
    </div>
  );
};

SettingCategory.defaultProps = {
  children: undefined,
};

const SubSettingCategory = (props: {
  title: string;
  children?: React.ReactNode;
}) => {
  const { title, children } = props;

  return (
    <div className="sub-setting-category">
      <div
        className="title-box"
        style={{
          padding: '5px 0px 5px 5px',
          marginBlockEnd: '20px',
          borderBottom: '1px solid #525366',
        }}
      >
        <h3 className="h-bold">{title}</h3>
      </div>
      <div style={{ marginLeft: '5px' }}>{children}</div>
    </div>
  );
};

SubSettingCategory.defaultProps = {
  children: undefined,
};

export { SettingSwitch, SettingCategory, SubSettingCategory };
