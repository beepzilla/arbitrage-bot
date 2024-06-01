import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/" exact activeClassName="active">Dashboard</NavLink>
        <NavLink to="/settings" activeClassName="active">Settings</NavLink>
        <NavLink to="/logs" activeClassName="active">Logs</NavLink>
      </nav>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/logs" component={Logs} />
      </Switch>
    </div>
  );
}

export default App;
