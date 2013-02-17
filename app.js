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
  res.render('index')
})

app.listen(3000)