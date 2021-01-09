import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Repository from '../repository';


const Routes: React.FC = () => {
  return (<Switch>
    <Route path='/' exact component={Dashboard} />
    <Route path='/repositories/:repository+' component={Repository} />
  </Switch>)
}

export default Routes

