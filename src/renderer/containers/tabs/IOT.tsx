import React from 'react';

const IOT = ({ name }: { name: string }) => {
  return (
    <div className="body-wrapper">
      <div className="body-panel-wrapper">
        This is the IOT control panel. Although the component exists,&nbsp; you
        should NOT be able to access it. Please file an issue in&nbsp;
        <a
          href="https://github.com/BSoDium/Slashboard/issues"
          target="_blank"
          rel="noreferrer"
        >
          the project&apos;s issue section&nbsp;
        </a>
        to report this bug
      </div>
    </div>
  );
};

export default IOT;
