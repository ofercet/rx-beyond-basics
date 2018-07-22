const http = require('http');
const attachWebsockets = require('./lib/ws');

const server = http.createServer();
attachWebsockets(server);
server.listen(8080, () => console.log('Server listening'));
