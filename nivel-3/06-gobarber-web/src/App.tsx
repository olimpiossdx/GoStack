import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './styles/global';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
    <GlobalStyles />
  </>
);

export default App;
