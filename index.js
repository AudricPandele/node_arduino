var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var five = require("johnny-five");
var board = new five.Board();

var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://auudrc.hopto.org:1337';
io.sails.autoConnect = false;

board.on("ready", function() {
  var socket = io.sails.connect();

  socket.request({
    url: 'http://auudrc.hopto.org:1337/camera',
    headers: {
      Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYXVkcmljIiwiZW1haWwiOiJhQGIuY29tIiwiZmlyc3ROYW1lIjoiQXVkcmljIiwibGFzdE5hbWUiOiJQYW5kZWzDqSIsImlkIjoxfSwiaWF0IjoxNDc2MzQzNDI2fQ.gQbpwFg_UZomuOoX840onEMR_dKmNq8JqOI-MKf2AoY'
    },
    method: 'GET'
  },
  function(response) {});

  socket.on('camera', function(data) {
    console.log(data);
    var servo = new five.Servo(10);
    if (data.data.position >= 5 && data.data.position <= 175) {
      servo.to(data.data.position);
    }
  })

  new five.Servo({
    pin: 10,
    range: [5, 175],
    startAt: 50
  });
});
