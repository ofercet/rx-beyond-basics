import {observable, decorate, computed} from 'mobx';
import {Observable} from 'rxjs';

class WebSocketStore {
    websockets = new Map();
    
    get count() {
        return this.websockets.size;
    }

    add(ws) {
        this.websockets.set(ws);
    }

    remove(ws) {
        this.websockets.delete(ws);
    }
}

decorate(WebSocketStore, {
    websockets: observable,
    count: computed
});

export const Store = new WebSocketStore();

function TrackableWebsocket(...args) {
    const ws = new WebSocket(...args);
    
    ws.addEventListener('open', () => Store.add(ws));
    ws.addEventListener('close', () => Store.remove(ws));

    return ws;
}


export function createWebsocketObservable(destination) {
    return new Observable(observer => {
        const ws = new TrackableWebsocket(destination);

        ws.onmessage = val => observer.next(val.data);
        ws.onerror = err => observer.error(err);
        ws.onclose = () => observer.complete();

        return () => ws.close();
    });
}
