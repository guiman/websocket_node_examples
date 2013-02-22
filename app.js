var express = require("express")
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

var users = []
var messages = []

app.get("/", function(req, res){
  var user_index = getUserIndex(req.connection.remoteAddress)

  res.render('index', {
    "username" : users[user_index],
    "users" : users,
    "messages" : messages
  })
})

app.post("/say", express.bodyParser(), function(req, res){
  if (req.body && req.body.message) {
    var user_index = req.connection.remoteAddress
    
    messages.push({ body: req.body.message, user: user_index })
    
    if (acceptsHtml(req.headers['accept'])){
      res.redirect(302, '/')
    } else {
      res.send({ status: "ok", message: "mensaje guardado" })
    }
  } else {
    res.send({ status: "nok", message: "fallo el envio del mensaje" })
  }
})

app.listen(3000)

// Helpers methods
function acceptsHtml(header) {
  var accepts = header.split(',')
  
  for (i = 0 ; i < accepts.length ; i ++) {
    if (accepts[i] === 'text/html') { return true }
  }
  
  return false
}

function getUserIndex(username){
  if (users.indexOf(username) == -1) {
    users[username] = { name: username }
  }
  
  return username
}