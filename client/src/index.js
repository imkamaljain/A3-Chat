import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export {default as Chat} from './components/Chat/Chat';
export {default as InfoBar} from './components/InfoBar/InfoBar';
export {default as Input} from './components/Input/Input';
export {default as Login} from './components/Login/Login';
export {default as Messages} from './components/Messages/Messages';
export {default as Message} from './components/Messages/Message/Message';

ReactDOM.render(<App />, document.getElementById('root'));