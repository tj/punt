
# Punt

  A small layer on top of node's core __UDP__ module to make fast volatile messaging even simpler.
  Punt uses the tiny [AMP](https://github.com/visionmedia/node-amp) prototol to serialize buffer, string,
  and json arguments.

## Installation

```
$ npm install punt
```

## Example

  A small in-proc example of a server with three clients:

```js
var punt = require('punt');
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
  c.send(new Buffer('hello'));
}, 150);
```

  yielding:

```
<Buffer 68 65 6c 6c 6f>
hello world
{ hello: 'world' }
<Buffer 68 65 6c 6c 6f>
hello world
{ hello: 'world' }
...
```
## API

### Server(addr)

  Bind to the given `addr`.

### Client(addr)

  Connect to the given `addr`.

### Client#send(...)

  Send one or more arguments a single atomic message. The following
  types are supported through AMP:

  - strings
  - buffers
  - objects (serialized as JSON)

## License

  MIT
