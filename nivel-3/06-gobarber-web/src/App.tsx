import GlobalStyles from './styles/globa';
import SignIn from './pages/Signin';
import SignUP from './pages/SignUP';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlobalStyles />
  </>
);

export default App;
