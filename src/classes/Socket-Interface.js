const http = require('http');
const socket = require('socket.io');
const fetch = require('isomorphic-fetch');
const utils = require('../utilities');

class SocketInterface {
	constructor({
		socketIOOptions,
		onConnection,
		onDisconnection,
		gateways,
		port,
		server
	}) {
		this.socketIOOptions = socketIOOptions;
		this.port = port || 9999;
		this.server = server ? http.createServer(server) : http.createServer((req, res) => res.write());
		this.io = require('socket.io')(this.server, this.socketIOOptions);
		this.io.on('connection', socket => {
			if (onConnection)
				utils.process(this.io, socket, onConnection)();
			if (onDisconnection)
				io.on('disconnect', utils.process(this.io, socket, onDisconnection));
			gateways.forEach(item => socket.on(item.name, utils.process(this.io, socket, item)));
		});
	}
	start() {
		this.server.listen(this.port, () => console.log('listening on http://localhost:' + this.port));
	}
}
module.exports = SocketInterface;