import React from 'react';
import VCButton from './components/VCButton';
import VCCalender from './components/VCCalender';
import './App.scss';

enum themes {
  LIGHT = 'light',
  DARK = 'dark'
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
        <br/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Filled' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Filled' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Filled' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Filled' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCButton icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton icon='ic_accessibility_p' type='Primary_Special' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCButton icon='ic_accessibility_p' type='Circle' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton icon='ic_accessibility_p' type='Circle' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton icon='ic_accessibility_p' type='Circle' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton icon='ic_accessibility_p' type='Circle' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special_1' onClick={() => { alert('Clicked GOV\'DAN'); }} size='S'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special_1' onClick={() => { alert('Clicked GOV\'DAN'); }} />
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special_1' onClick={() => { alert('Clicked GOV\'DAN'); }} size='L'/>
        <VCButton text='ADAM' icon='ic_accessibility_p' type='Primary_Special_1' onClick={() => { alert('Clicked GOV\'DAN'); }} disabled={true} />
        <br/>
        <VCCalender />
        <div className='themeSwitchBtn'>
          <button onClick={() => { setTheme(themes.LIGHT); }}>light</button>
          <button onClick={() => { setTheme(themes.DARK); }} >dark</button>
        </div>
      </div>
    </div>
  );
}

export default App;
