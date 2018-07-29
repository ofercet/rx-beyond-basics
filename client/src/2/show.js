import WebSocket from '../WebSocket';
import {Observable} from 'rxjs';
import TweetStore from './store';

function getWebsocket(destination) {
    return new Observable(observer => {
        const ws = new WebSocket(destination);

        ws.onmessage = val => observer.next(val.data);
        ws.onerror = err => observer.error(err);
        ws.onclose = () => observer.complete();

        return () => ws.close();
    });
}

const tweet$ = getWebsocket('ws://localhost:8080/tweets?track=trump');
let count = 0;
const subscription = tweet$.subscribe(tweet => {
    if (count++ < 20) {
        TweetStore.printTweet(tweet);
    } else {
        subscription.unsubscribe();
    }
});
