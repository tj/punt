
var punt = require('..');
var server = punt.bind('0.0.0.0:5000');
var a = punt.connect('0.0.0.0:5000');
var b = punt.connect('0.0.0.0:5000');
var c = punt.connect('0.0.0.0:5000');

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

setInterval(function(){
  c.send(new Buffer('hello world with fn'), function(err, bytes) {
    console.log('Sent %s bytes', bytes);
  });
}, 150);
