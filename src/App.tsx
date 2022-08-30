import React from 'react';
import Header from './components/Header/Header';
import './styles/_global.scss';
import MainContent from './components/MainContent/MainContent';
import Controls from './components/Controls/Controls';

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Controls />
    </>
  );
}

export default App;
