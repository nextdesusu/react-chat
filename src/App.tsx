import React from 'react';

import Chat from "./components/Chat";

import './App.css';

function App() {

  return (
    <div>
      <Chat userName={`USER:${Math.random().toString(16)}`}/>
    </div>
  );
}

export default App;
