import {createWebsocketObservable} from '../WebSocket';
import TweetStore from './store';

const tweet$ = createWebsocketObservable('ws://localhost:8080/tweets?track=trump');
tweet$.subscribe(tweet => TweetStore.printTweet(tweet));
