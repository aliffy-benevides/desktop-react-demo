import './App.css';
import React, { useCallback, useEffect, useState } from 'react';

import reactLogo from './assets/react-logo.svg';
import electronLogo from './assets/electron-logo.svg';
import useInterval from './hooks/useInterval';

const { ipcRenderer, isElectron } = window

function App() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (isElectron) {
      ipcRenderer.on('pong', (event, arg) => {
        setCounter(arg)
      })
    }
  }, [])

  const sendCounter = useCallback(() => {
    if (isElectron) {
      ipcRenderer.send('ping', counter)
    }
  }, [counter])

  useInterval(sendCounter, 1000)

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logos">
          <img src={reactLogo} className="App-logo" alt="logo" />
          <img src={electronLogo} className="App-logo" alt="logo" />
        </div>
        <div>
          <strong>Counter: </strong>
          <span>{counter}</span>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-link">
          Learn React at https://reactjs.org
        </p>
        <p className="App-link">
          and Electron at https://www.electronjs.org
        </p>
      </header>
    </div>
  );
}

export default App;
