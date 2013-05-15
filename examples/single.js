
var punt = require('..');
var server = punt.bind('udp://0.0.0.0:5000');
var a = punt.connect('udp://0.0.0.0:5000');
var b = punt.connect('udp://0.0.0.0:5000');
var c = punt.connect('udp://0.0.0.0:5000');

server.on('message', function(msg){
  console.log(msg);
});

setInterval(function(){
  a.send({ hello: 'world' });
}, 150);

setInterval(function(){
  b.send('hello world');
}, 150);

setInterval(function(){
  c.send(new Buffer('hello world'));
}, 150);
