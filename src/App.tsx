import React from 'react';
import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContentContainer from '@components/MainContentContainer/MainContentContainer';
import MainControls from './features/Controls/components/MainControls/MainControls';

function App() {
  return (
    <>
      <Header />
      <MainContentContainer />
      <MainControls />
    </>
  );
}

export default App;
