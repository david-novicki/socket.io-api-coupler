const SocketInterface = require('../src/index');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const instance = new SocketInterface({
	...config,
	server: (req, res) => {
		const filePath = path.join(__dirname, 'index.html');
		const stat = fs.statSync(filePath);
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': stat.size
		});
		const readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	}
});
instance.start();