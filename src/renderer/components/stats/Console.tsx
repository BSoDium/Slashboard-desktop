import React from 'react';
import { ReactTerminal } from 'react-terminal'; // remember to remove this
// import Terminal from 'terminal-in-react'; // and this

class Console extends React.Component<{}, {}> {
  render() {
    return (
      <div className="terminal-wrapper">
        <ReactTerminal
          themes={{
            Darktheme: {
              themeBGColor: '#000',
              themeColor: '#FFFEFC',
              themePromptColor: '#fff',
            },
          }}
          showControlBar={false}
          theme="Darktheme"
        />
      </div>
    );
  }
}

export default Console;
