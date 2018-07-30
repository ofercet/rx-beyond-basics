import {createWebsocketObservable} from '../WebSocket';
import TweetStore from './store';
import {getTweetScore} from '../sentiment';

const tweet$ = createWebsocketObservable('ws://localhost:8080/tweets?track=trump')
    .map(JSON.parse)
    .map(tweet => ({...tweet, score: getTweetScore(tweet)}))
    .share();
tweet$.subscribe(tweet => TweetStore.printTweet(tweet));
tweet$.scan(count => count + 1, 0).subscribe(count => TweetStore.printTweetCount(count));
