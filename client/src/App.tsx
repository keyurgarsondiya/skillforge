import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './components';

function App(): React.ReactElement {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
