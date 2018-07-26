import React from 'react';
import './App.css';

export default ({children}) => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Rx - Beyond Basics</h1>
        </header>
        {children}
    </div>
);
