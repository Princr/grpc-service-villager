const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }

const PROTO_PATH = __dirname + '/village.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    options
    );
const user_proto = grpc.loadPackageDefinition(packageDefinition).user;


createUser = (call, callback) =>{
  callback(null, {message: 'prince@techvillage.org.zw' + call.request.email})
}

main = () => {
  const server = new grpc.Server();
  server.addService(user_proto.BasicAuth.service, {BasicAuth: BasicAuth})
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(`Server now running on port 50051`)
}

main();
