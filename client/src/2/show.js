import {createWebsocketObservable} from '../WebSocket';
import TweetStore from './store';

const tweet$ = createWebsocketObservable('ws://localhost:8080/tweets?track=trump');
let count = 0;
const subscription = tweet$.subscribe(tweet => {
    if (count++ < 20) {
        TweetStore.printTweet(tweet);
    } else {
        subscription.unsubscribe();
    }
});
