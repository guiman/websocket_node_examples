var WebSocketServer = require('websocket').server
var express = require("express")
var http = require('http')
var S = require('string')
var app = express()

/*
 * Although generally we start server with createServer()
 * due to deprecation, express now requests to create them
 * using this expression "express()"
 */

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(express.logger('dev'))

users = []

// The HTTP part
app.get("/", function(req, res){
  var user_index = getUserIndex(req.connection.remoteAddress)

  res.render('index', {
    "username" : users[user_index],
    "users" : users,
    "messages" : []
  })
})

// We start the server
var server = http.createServer(app)
// And also tell that there will be a WebSocketServer listening on the same port
wsServer = new WebSocketServer({
    httpServer: server
});
// Now listen on 3000
server.listen(3000)

var connections = []
var messages = []

// WebSocket logic
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection accepted.');
  
  var connection = request.accept('echo-protocol', request.origin)
  var user_index = getUserIndex(connection.remoteAddress)
  
  connections.push({ conn: connection, owner: user_index})
    
  //Connection Callbacks
  connection.on('message', function(message) {
      if (message.type === 'utf8')
      {
        body = JSON.parse(message.utf8Data)

        //Only gifs
        if (body.message.search(/^\!.*\gif$/) != -1)
        {
          //let's show some gifs
          body.message = body.message.replace(/\!(.*)$/, "<a href=\"$1\" target=\"blank\"><img src=\"$1\" /></a>")
        }
        else
        {
          body.message = S(body.message).escapeHTML().s
        }

        var object = { body: body, user: user_index, time: new Date() }

        // Send notifications to all the other connections
        for (i = 0; i < connections.length; i++)
        {
          if (connections[i].owner != user_index)
          {
            connections[i].conn.sendUTF(JSON.stringify(object))
          }
        }
      }
  })
  
  connection.on('close', function(reasonCode, description) {
    connections.splice(getUserIndex(connection.remoteAddress))
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
  });
});


// Helpers methods
function getUserIndex(username){
  if (users.indexOf(username) == -1) {
    users[username] = { name: username }
  }
  
  return username
}
