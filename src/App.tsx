import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContentContainer from '@components/MainContentContainer/MainContentContainer';
import PlayerControls from './features/Controls/components/PlayerControls/PlayerControls';
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
        </SidebarAppearanceProvider>
        <PlayerControls />
      </ModalsProvider>
    </>
  );
}

export default App;
