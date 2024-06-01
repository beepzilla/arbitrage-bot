import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/" exact="true" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/settings" activeclassname="active">Settings</NavLink>
        <NavLink to="/logs" activeclassname="active">Logs</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  );
}

export default App;
