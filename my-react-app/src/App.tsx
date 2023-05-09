import React from 'react';
import Alice from './Alice';
import Rabbit from './Rabbit';
import Transcript from './Transcript';

const App: React.FC = () => {
  const currentPage = window.location.pathname.slice(1);

  let ChatInterface;
  if (currentPage === 'Alice') {
    ChatInterface = <Alice />;
  } else if (currentPage === 'Rabbit') {
    ChatInterface = <Rabbit />;
  } else if (currentPage === 'Transcript') {
    ChatInterface = <Transcript />;
  } else {
    ChatInterface = <div className="App">Nothing there! Check Rabbit, Alice, or Transcript</div>;
  }

  return <div className="App">{ChatInterface}</div>;
};

export default App;
