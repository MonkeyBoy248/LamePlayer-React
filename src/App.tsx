import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContentContainer from '@components/MainContentContainer/MainContentContainer';
import MainControls from './features/Controls/components/MainControls/MainControls';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/User/selectors';

function App() {
  const theme = useSelector(selectTheme);
  document.body.className = theme;

  return (
    <>
      <Header />
      <MainContentContainer />
      <MainControls />
    </>
  );
}

export default App;
