module.exports = {
	onConnection: {
		name: 'connections',
		url: 'https://jsonplaceholder.typicode.com/posts',
		method: 'GET',
		emit: 'all'
	},
	onDisconnect: {
		name: 'disconnections',
		url: 'https://jsonplaceholder.typicode.com/posts',
		method: 'GET',
		emit: 'all'
	},
	gateways: [{
		name: 'room1',
		url: 'https://jsonplaceholder.typicode.com/posts/:id',
		method: 'PUT',
		params: ['id'],
		emit: 'allButSender'
	}]
};