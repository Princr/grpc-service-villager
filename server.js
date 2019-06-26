const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }

const SERVER_ADDRESS = "0.0.0.0:5001";

const PROTO_PATH = __dirname + '/village.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
      PROTO_PATH,
      options
    );

let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let users = [];

// Receive message from client joining
join = (call, callback) => {
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
}
  
// Receive message from client
send = (call, callback) => {
  notifyChat(call.request);
}
  
// Send message to all connected clients
notifyChat = (message) => {
  users.forEach(user => {
    user.write(message);
  });
}
  
main = () => {
  const server = new grpc.Server()
  server.addService(proto.village.Chat.service, { join: join, send: send });
    
  server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    
  server.start();
}


main();
