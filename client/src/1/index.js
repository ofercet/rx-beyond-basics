import React from 'react';
import {observer} from 'mobx-react';
import TweetStore from './store';
import '../App.css';
import './show';

const App = observer(() => (
    <div className="tweet-container">
        {TweetStore.tweets.map((tweet, i) => (
            <span key={i.toString()}>
                {tweet.text}
                <br />
            </span>
        ))}
    </div>
));

export default App;
