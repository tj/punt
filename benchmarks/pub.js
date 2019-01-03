
var punt = require('..');

var c = punt.connect('0.0.0.0:5050');

var b = Buffer.from(Array(256).join('a'));
function next() {
  var n = 100;
  while (n--) c.send(b);
  setImmediate(next);
}

next();
