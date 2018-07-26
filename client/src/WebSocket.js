import {observable, decorate} from 'mobx';

class WebSocketStore {
    count = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

decorate(WebSocketStore, {
    count: observable,
});

export const Store = new WebSocketStore();

export default function(...args) {
    const ws = new WebSocket(...args);
    ws.addEventListener('open', () => Store.increment());
    ws.addEventListener('close', () => Store.decrement());
    return ws;
}
