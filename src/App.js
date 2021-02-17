import './App.css';

import reactLogo from './assets/react-logo.svg';
import electronLogo from './assets/electron-logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logos">
          <img src={reactLogo} className="App-logo" alt="logo" />
          <img src={electronLogo} className="App-logo" alt="logo" />
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
