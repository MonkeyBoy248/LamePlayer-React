import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContentContainer from '@components/MainContentContainer/MainContentContainer';
import MainControls from './features/Controls/components/MainControls/MainControls';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/User/selectors';
import { SidebarAppearanceProvider } from './contexts/SidebarAppearanceContext';
import { ModalsProvider } from './contexts/ModalsContext';

function App(): JSX.Element {
  const theme = useSelector(selectTheme);
  document.body.className = theme;

  return (
    <>
      <ModalsProvider>
        <SidebarAppearanceProvider>
          <Header />
          <MainContentContainer />
          <MainControls />
        </SidebarAppearanceProvider>
      </ModalsProvider>
    </>
  );
}

export default App;
