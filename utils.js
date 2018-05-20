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
		console.log(builtUrl)
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
};
const buildUrl = (url, params, data) => params.reduce((acc, currentVal) =>
	acc.replace(`:${currentVal}`, data[currentVal]), url);

module.exports = {
	forwardCallback: (socket, item) => async (data) => {
		console.log('message received', data);
		socket.emit(item.name, await processFetch(item, data));
	}
};