import io from 'socket.io-client'
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const socket = io('http://localhost:3030');
const client: any = feathers();
client.configure(feathers.socketio(socket, {
   timeout: 2000
}));
/*
client.configure(feathers.authentication({
   storage: window.localStorage
}))
*/

export default client