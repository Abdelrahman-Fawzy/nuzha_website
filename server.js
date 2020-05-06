var StaticServer  = require('static-server'),
    server = new StaticServer({
      rootPath: './dist/',            // required, the root of the server file tree
      port: 7598
    });

server.start(function () {
  console.log('server started at port ', server.port);
});
