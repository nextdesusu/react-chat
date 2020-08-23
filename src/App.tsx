import React from 'react';

import Chat from "./components/Chat";

import './App.css';

function App() {

  return (
    <div>
      <Chat channel="11111" userName={`USER:${Math.random().toString(16)}`}/>
    </div>
  );
}

export default App;
