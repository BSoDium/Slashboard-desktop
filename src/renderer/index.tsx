require('typeface-montserrat');
require('typeface-cairo');
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'renderer/App';
import { TerminalContextProvider } from 'react-terminal';

ReactDOM.render(
  <TerminalContextProvider>
    <App />
  </TerminalContextProvider>,
  document.getElementById('root')
);
