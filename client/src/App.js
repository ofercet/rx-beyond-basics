import React, {Component} from 'react';
import {Observable} from 'rxjs';
import logo from './logo.svg';
import './App.css';

const ws = Observable.webSocket('ws://localhost:8080/tweets');

class App extends Component {
    state = {
        tweets: [],
    };

    componentDidMount() {
        this.subscription = ws
            .take(100)
            .bufferTime(3000)
            .filter(tweets => tweets.length > 0)
            // .scan((arr, val) => [...arr, ...val], [])
            .subscribe(tweets => this.setState({tweets}));
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {this.state.tweets.reverse().map(tweet => (
                    <span>
                        {tweet.text}
                        <br />
                    </span>
                ))}
            </div>
        );
    }
}

export default App;
