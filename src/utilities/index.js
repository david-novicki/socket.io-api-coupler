const buildUrl = (url, params, data) => {
	if (!params) return url;
	return params.reduce((acc, currentVal) =>
		acc.replace(`:${currentVal}`, data[currentVal]), url);
};
const process = (io, socket, item) => async (data) => {
	let response = await processFetch(item, data);
	if (item.emit)
		emit(io, socket, item, response);
};
const emit = (io, socket, item, data) => {
	switch (item.emit) {
		case 'all':
			io.emit(item.name, data);
			break;
		case 'allButSender':
			socket.broadcast.emit(item.name, data);
			break;
		case 'sender':
			socket.emit(item.name, data);
			break;
		default:
			break;
	}
}
const processFetch = async ({
	url,
	method,
	params,
}, data) => {
	try {
		let response;
		let requestObj = {};
		let builtUrl = url;
		if (params) builtUrl = buildUrl(url, params, data);
		if (data && method !== 'GET') requestObj.body = JSON.stringify(data);
		response = await fetch(builtUrl, {
			...requestObj,
			method,
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'basic testtoken'
			})
		});
		//if bad response return error with status code
		if (!response.ok) return {
			status: response.status,
			error: response.statusText
		};
		//else convert to json and ship with status code
		const responseData = await response.json();
		return {
			status: response.status,
			...responseData
		};
	} catch (error) {
		return {
			error: error.message
		};
	}
}

module.exports = {
	process,
	processFetch
};