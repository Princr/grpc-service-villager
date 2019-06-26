let grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
 
//Read terminal Lines
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
//Load the protobuf
const PROTO_PATH = __dirname + '/village.proto';
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);
 
const REMOTE_SERVER = "0.0.0.0:5001";
 
let username;
 
//Create gRPC client
let client = new proto.village.Chat(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);
 
//Start the stream between server and client
startChat = () => {
  let channel = client.join({ user: username });
 
  channel.on("data", onData);
 
  rl.on("line", function(text) {
    client.send({ user: username, text: text }, res => {});
  });
}
 
//When server send a message
onData = (message) => {
  if (message.user == username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}
 
//Ask user name then start the chat
rl.question("What's ur name? ", answer => {
  username = answer;
 
  startChat();
});