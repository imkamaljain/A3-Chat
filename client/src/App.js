import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login, Chat } from './index';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
