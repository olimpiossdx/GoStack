import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/Signin';
import SignUP from '../pages/SignUP';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUP} />
    </Switch>
  );
};

export default Routes;
