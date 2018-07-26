import http from 'http';
import {attachWebsockets} from './lib/ws';

const server = http.createServer();
attachWebsockets(server);
server.listen(8080, () => console.log('Server listening'));
