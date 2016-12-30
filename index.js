var express = require('express');
var parser = require('body-parser').urlencoded({extended: false});
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var {selectNote, insertNote, removeNote, updateNote} = require('./db.js');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
server.listen(process.env.PORT || 3000,() => console.log('Server started'));

app.get('/test', function(req, res){
  selectNote((err, result) => {
    res.send(result.rows);
  });
});

app.get('/', require('./controler/indexRoute.js'));
app.post('/insert', parser, require('./controler/insert.js'));
app.post('/update', parser, require('./controler/update.js'));
app.post('/select', parser, require('./controler/select.js'));
app.post('/remove', parser, require('./controler/remove.js'));

io.on('connection', socket => {
  console.log('Co nguoi ket noi');
  selectNote((err, result) => {
    socket.emit('SERVER_SEND_LIST', result.rows)
  });

  socket.on('CLIENT_ADD_NOTE', data => {
    var {sub, note} = data;
    insertNote(sub, note, (err, result) => {
      if(err) return console.log(err + '');
      socket.emit('SERVER_CONFIRM_ADD', result.rows[0]);
    });
  });

  socket.on('CLIENT_REMOVE_NOTE', id => {
    removeNote(id, (err, result) => {
      if(err) return console.log(err + '');
      socket.emit('SERVER_CONFIRM_REMOVE', id);
    });
  });

  socket.on('CLIENT_UPDATE_NOTE', info => {
    var {id, note, sub} = info;
    updateNote(sub, note, id, (err, result) => {
      if(err) return console.log(err + '');
      socket.emit('SERVER_CONFIRM_UPDATE', info);
    })
  });
});
