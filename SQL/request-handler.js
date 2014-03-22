var httpHelpers = require('./http-helpers');
var dbhelp = require('./db-helpers');

var getMessages = function(request, response){
  dbhelp.getMessages(function(messages){
    var messages = messages.reverse();
    httpHelpers.sendResponse(response, {results: messages} );
  });
  //console.log(messages);

};

var postMessage = function(request, response){
  // listen for chunks, assemble them
  httpHelpers.collectData(request, function(data){
    // parse the data
    var message = JSON.parse(data);
    console.log(message);
    // write message to db
    dbhelp.addMessage(message);
    httpHelpers.sendResponse(response, null, 201);
  });
};

var options = function(request, response){
  httpHelpers.sendResponse(response);
};

var actions = {
  'GET': getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

exports.handler = function(request, response) {
  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    httpHelpers.sendResponse(response, null, 404);
  }
};
