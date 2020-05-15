import React from 'react';
import './App.module.scss';
import Dashboard from "./containers/Dashboard"

function App() {
  return (
    <section className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </section>
  );
}

export default App;
