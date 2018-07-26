import WebSocket from 'ws';
import url from 'url';
import {getTwitterStream} from './twitterStream';

export function attachWebsockets(server) {
    const wss = new WebSocket.Server({
        server,
        path: '/tweets',
    });

    wss.on('connection', (ws, req) => {
        const requestUrl = url.parse(req.url, true);
        const track = requestUrl.query.track;

        if (!track) {
            console.log('Connection rejected');
            ws.close(4000, 'Missing query param "track"');
            return;
        }

        console.log('Connection established, tracking:', track);
        const subscription = getTwitterStream(track)
            .map(JSON.stringify)
            .subscribe(msg => ws.send(msg));

        ws.on('close', () => {
            console.log('Connection terminated');
            subscription.unsubscribe();
        });
    });
}
