import React from 'react';
import { ShellBar } from './components/ShellBar';
import './App.scss';
// import './scss/_mixins.scss'
// import './style.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <ShellBar onClick={()=>{alert('Hi GOL\'DAN')}}><div><b>HI GUL'DAN</b></div></ShellBar>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
