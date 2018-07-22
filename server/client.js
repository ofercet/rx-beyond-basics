const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080/tweets');
ws.on('message', msg => console.log('Got message', JSON.parse(msg).text));
