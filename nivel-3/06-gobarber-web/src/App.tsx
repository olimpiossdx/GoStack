import GlobalStyles from './styles/globa';
import SignIn from './pages/Signin';
import SignUP from './pages/SignUP';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
