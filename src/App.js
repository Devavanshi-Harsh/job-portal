import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
