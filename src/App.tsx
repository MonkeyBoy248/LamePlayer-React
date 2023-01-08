import React from 'react';
import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContentContainer from '@components/MainContentContainer/MainContentContainer';
import Controls from './components/Controls/Controls';

function App() {
  return (
    <>
      <Header />
      <MainContentContainer />
      <Controls />
    </>
  );
}

export default App;
