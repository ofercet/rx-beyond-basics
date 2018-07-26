import React, {Component} from 'react';
import {Observable} from 'rxjs';
import Sentiment from 'sentiment';
import logo from './logo.svg';
import './App.css';

function getWebsocket(destination) {
    return new Observable(observer => {
        const ws = new WebSocket(destination);

        ws.onmessage = val => observer.next(val.data);
        ws.onerror = err => observer.error(err);
        ws.onclose = () => observer.complete();

        return () => ws.close();
    });
}

class App extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.sentiment = new Sentiment();
        this.subscription = null;
        this.state = {
            tweets: [],
            isConnected: false,
            count: 0,
            positiveCount: 0,
            negativeCount: 0,
        };
    }

    start() {
        this.stop();
        this.setState({isConnected: true});

        const ws = getWebsocket('ws://localhost:8080/tweets?track=trump')
            .map(JSON.parse)
            .repeat()
            .retry()
            .share()
            .map(tweet => ({
                ...tweet,
                score: this.sentiment.analyze(tweet.text).score,
            }));

        this.subscription = ws.subscribe(tweet =>
            this.setState(state => ({
                count: state.count + 1,
                tweets: [tweet, ...state.tweets].slice(0, 50),
            }))
        );
        const [positive, negative] = ws.partition(tweet => tweet.score >= 0);
        this.subscription.add(
            positive.scan(count => count + 1, this.state.positiveCount).subscribe(count =>
                this.setState({
                    positiveCount: count,
                })
            )
        );
        this.subscription.add(
            negative.scan(count => count + 1, this.state.negativeCount).subscribe(count =>
                this.setState({
                    negativeCount: count,
                })
            )
        );
    }

    stop() {
        if (this.subscription) {
            this.setState({isConnected: false});
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <span className="positive">{this.state.positiveCount} </span>
                    {this.state.isConnected ? (
                        <span className="positive">CONNECTED</span>
                    ) : (
                        <span className="neutral">DISCONNECTED</span>
                    )}
                    <span className="negative"> {this.state.negativeCount}</span>
                    <br />
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                </p>
                <span>{this.state.count}</span>
                <div style={{textAlign: 'left', marginLeft: '15%'}}>
                    {this.state.tweets.map((tweet, i) => (
                        <span key={i.toString()} className={tweet.score > 0 ? 'positive' : 'negative'}>
                            {tweet.text}
                            <br />
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
