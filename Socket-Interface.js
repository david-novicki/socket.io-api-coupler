const http = require('http');
const socket = require('socket.io');
const path = require('path');
const fs = require('fs');
const fetch = require('isomorphic-fetch');
const utils = require('./utils');

class SocketInterface {
	constructor({
		socketIOOptions,
		gateways,
		port
	}) {
		this.socketIOOptions = socketIOOptions;
		this.port = port || 9999;
		//this.server = http.createServer((req, res) => res.write());
		this.server = http.createServer((req, res) => {
			const filePath = path.join(__dirname, 'index.html');
			const stat = fs.statSync(filePath);
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Content-Length': stat.size
			});
			const readStream = fs.createReadStream(filePath);
			readStream.pipe(res);
		});
		this.io = require('socket.io')(this.server, this.socketIOOptions);
		this.io.on('connection', (socket) => {
			console.log('a user connected');
			gateways.forEach(item => socket.on(item.name, utils.forwardCallback(socket, item)));
		});
	}
	start() {
		this.server.listen(this.port, () => console.log('listening on http://localhost:' + this.port));
	}
}
module.exports = SocketInterface;