import React from 'react';
import {observer} from 'mobx-react';
import {Store} from './WebSocket';
import './App.css';

export default observer(({children}) => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Rx - Beyond Basics</h1>
            <h1 className="App-title">WebSockets open {Store.count}</h1>
        </header>
        {children}
    </div>
));
