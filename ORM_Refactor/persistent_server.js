/* global require */

var mysql = require('mysql');
var http = require('http');
var messageHandler = require('./request-handler');
var httpHelpers = require('./http-helpers');
var url = require('url');
var dbhelp = require('./db-helpers');
/* If the node mysql module is not found on your system, you may
 * need to do an 'sudo npm install -g mysql'. */

/* You'll need to fill the following out with your mysql username and password.
 * database: 'chat' specifies that we're using the database called
 * 'chat', which we created by running schema.sql.*/


/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/
//
//moved dbConnect to dbConfig

var port = 8080;

var ip = '127.0.0.1';

var routes = {
  '/classes/messages': messageHandler.handler,
  '/classes/users': messageHandler.handler,
  '/classes/room': messageHandler.handler
};

var router = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var parsedUri = url.parse(request.url);

  var route = routes[parsedUri.pathname];
  if( route ){
    route(request, response);
  } else {
    httpHelpers.sendResponse(response, null, 404);
  }
};

var server = http.createServer(router);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

