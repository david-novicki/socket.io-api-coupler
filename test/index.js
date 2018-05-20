const SocketInterface = require('../index');
const instance = new SocketInterface(require('./config'));
instance.start();