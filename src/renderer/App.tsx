import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Window from 'renderer/containers/Window';
import Login from 'renderer/components/Login';
import HomePage from 'renderer/containers/HomePage';
import Dashboard from 'renderer/containers/Dashboard';
import ControlPanel from 'renderer/containers/tabs/ControlPanel';
import IOT from 'renderer/containers/tabs/IOT';
import Logs from 'renderer/containers/tabs/Logs';
import ServerStats from 'renderer/components/stats/ServerStats';

import 'renderer/App.global.scss';
import Storage from './utils/Storage';

interface State {
  offlineMode: boolean;
}

class App extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      offlineMode: false,
    };
    Storage.updateInternals();
    Storage.updateServers();
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
                  name="ControlPanel"
                />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/dashboard/iot">
            <Window>
              <Dashboard>
                <IOT name="IOT" />
              </Dashboard>
            </Window>
          </Route>

          <Route path="/dashboard/logs">
            <Window>
              <Dashboard>
                <Logs name="Logs" />
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
