const WebSocket = require('ws');
const twitterStream = require('./twitterStream');

module.exports = function attachWebsockets(server) {
    const wss = new WebSocket.Server({
        server,
        path: '/tweets',
    });

    wss.on('connection', ws => {
        const subscription = twitterStream('tech')
            .map(JSON.stringify)
            .do(msg => ws.send(msg))
            .subscribe();

        ws.on('close', () => subscription.unsubscribe());
    });
};
