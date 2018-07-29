import {observable, decorate, computed} from 'mobx';

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

export default function(...args) {
    const ws = new WebSocket(...args);
    ws.addEventListener('open', () => Store.add(ws));
    ws.addEventListener('close', () => Store.remove(ws));
    return ws;
}
