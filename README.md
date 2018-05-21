# Socket.io to API Coupler

** UNDER CONSTRUCTION **

Ever has a need to move your exisiting API's to Push/Pull relationships? With Socket.io-to-API-coupler, you can build that serverless chat application you always wanted. The main objective of this library is standardize a way to proxy Socket.io frames to your backend APIs.

## Example

```js
const SocketInterface = require("../index");
const instance = new SocketInterface({
  port: 8080 //default 9999
  gateways: [
    {
      name: "message", // socket.io event name [required]
      url: "https://jsonplaceholder.typicode.com/posts/:id",// forwarding API url [required]
      method: "PUT", // Method type [required]
      params: ["id"], // any params to be replaced in the url from data in socket payload
      emit: "all" // options: all, allButSender, defines 'who' to emit the response of the api
    }
  ]
});
instance.start();// a Socket.io backend API is started and take events and forward the data
```
