import GlobalStyles from './styles/globa';
import SignIn from './pages/Signin';
import SignUP from './pages/SignUP';

import { AuthProvider } from './hooks/AuthContext';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
);

export default App;
