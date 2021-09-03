import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Window from 'renderer/containers/Window';
import Login from 'renderer/components/Login';
import HomePage from 'renderer/containers/HomePage';
import Dashboard from 'renderer/containers/Dashboard';
import ControlPanel from 'renderer/containers/ControlPanel';
import IOT from 'renderer/containers/IOT';
import Logs from 'renderer/containers/Logs';
import ServerStats from 'renderer/components/stats/ServerStats';

import 'renderer/App.global.scss';

interface CompactState {
  value: any;
  setter: (value: boolean) => void;
}

interface Props { }

interface State {
  offlineMode: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      offlineMode: false,
    };
  }

  render() {
    const { offlineMode } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Window>
              <Login />
            </Window>
          </Route>

          <Route path="/dashboard/servers/:ip-:port-:auth">
            <Window>
              <Dashboard>
                <ServerStats />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/dashboard/servers">
            <Window>
              <Dashboard>
                <ControlPanel
                  offline={{
                    value: offlineMode,
                    setter: (value: boolean) => {
                      this.setState({ offlineMode: value });
                    },
                  }}
                />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/dashboard/iot">
            <Window>
              <Dashboard>
                <IOT />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/dashboard/logs">
            <Window>
              <Dashboard>
                <Logs />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/">
            <Window>
              <HomePage />
            </Window>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
export { App, CompactState };
