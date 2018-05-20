import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Main from './Main';

const Routes = () => {
  // const routes = [
  // ];
  return (
    <Router>
      <div>
        <Route render={({ history }) => <Nav history={history} />} />
        <Route path="/" component={ Main } />
      </div>
    </Router>
  );
};

export default Routes;
