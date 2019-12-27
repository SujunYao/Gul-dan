import React from 'react';
import { VCButton } from './components/VCButton/VCButton';
import './App.scss';

enum themes {
  LIGHT = 'light',
  DARK = 'dark'
};

enum SIZE {
  SMALL = 'S',
  NORMAL = 'N',
  LARGE = "L"
};

const initialState = {
  theme: themes.DARK
};

type State = Readonly<typeof initialState>;

const App: React.FC = () => {
  const [theme, setTheme] = React.useState(themes.DARK);

  return (
    <div className={`App theme-${theme}`}>
      <div className='container'>
        <VCButton text='ADAM' icon='ic_accessibility_p' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton text='ADAM' icon='ic_accessibility_p' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />

        <div className='themeSwitchBtn'>
          <button onClick={() => { setTheme(themes.LIGHT); }}>light</button>
          <button onClick={() => { setTheme(themes.DARK); }} >dark</button>
        </div>
      </div>
    </div>
  );
}

export default App;
