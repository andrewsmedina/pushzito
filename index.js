var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', function(req, res) {
  var users = req.session.users;

  if (!users) {
    users = req.session.users = [];
  }

  users.push(req.body.username);

  res.redirect('/chat')
});

app.get('/chat', function(req, res){
  console.log("users 2:", req.session.users);
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
