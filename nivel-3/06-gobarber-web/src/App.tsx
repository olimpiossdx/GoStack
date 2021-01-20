import GlobalStyles from './styles/globa';
import SignIn from './pages/Signin';
import SignUP from './pages/SignUP';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Olimpio' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyles />
  </>
);

export default App;
