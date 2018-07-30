import {createWebsocketObservable} from '../WebSocket';
import TweetStore from './store';

const tweet$ = createWebsocketObservable('ws://localhost:8080/tweets?track=trump');
tweet$.subscribe(tweet => TweetStore.printTweet(tweet));
tweet$.scan(count => count + 1, 0).subscribe(count => TweetStore.printTweetCount(count));
