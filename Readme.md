
# Punt

  A small layer on top of node's core __UDP__ module to make fast messaging even simpler.

## Installation

```
$ npm install punt
```

## Example

  A small in-proc example of a server with three clients:

```js
var punt = require('punt');
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
```

  yielding:

```
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
hello world
{ hello: 'world' }
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
hello world
{ hello: 'world' }
...
```

## Protocol

  Punt's protocol is super simple, a `type` annotation followed by the original `data`:

```
    1        N
 +-----------------+
 | type | data ... |
 +-----------------+
 ```

  Where `type` is one of the following:

  - `0`: buffer
  - `1`: string
  - `2`: json

## API

### Server(addr)

  Bind to the given `addr`.

### Client(addr)

  Connect to the given `addr`.

### Client#send(msg)

  Send `msg` which may be a `Buffer`, string, or object converted to JSON.

## License

  MIT
