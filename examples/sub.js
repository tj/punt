
var punt = require('..');
var sock = punt.bind('udp://0.0.0.0:5000');

sock.on('message', function(msg){
  console.log(msg);
});
