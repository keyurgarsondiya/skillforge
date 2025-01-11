import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router, Header } from './components';

function App(): React.ReactElement {
  return (
    <HashRouter>
      <Header />
      <Router />
    </HashRouter>
  );
}

export default App;
