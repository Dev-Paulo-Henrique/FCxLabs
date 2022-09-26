const socketio = require('socket.io');
// const parseStringAsArray = require('./utils/parseStringAsArray');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    // const { info } = socket.handshake.query;

    connections.push({
      id: socket.id,
      // info: parseStringAsArray(info),
    });
  });
};