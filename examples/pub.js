
var punt = require('..');
var sock = punt.connect('udp://0.0.0.0:5000');

setInterval(function(){
  sock.send({ hello: 'world' });
}, 10);
