
var assert = require('better-assert');
var punt = require('..');

var s = punt.bind('0.0.0.0:5000');
var c = punt.connect('0.0.0.0:5000');

describe('.bind()', function(){
  it('should support ephemeral ports', function(done){
    var s = punt.bind('0.0.0.0:0');

    s.on('bind', function(){
      assert(s.address, '.address missing');
      assert(s.address.address);
      assert(s.address.port);
      done();
    });
  })
})

describe('.send(buffer)', function(){
  it('should transfer the message', function(done){
    s.once('message', function(msg){
      assert('Buffer' == msg.constructor.name);
      assert('Hello' == msg.toString());
      assert(10 == this.info.size);
      done();
    });

    c.send(new Buffer('Hello'));
  })
})

describe('.send(buffer, callback)', function(){
  it('should invoke the callback', function(done){
    c.send(new Buffer('Hello'), new Buffer('World'), function(err, bytes) {
      assert(!err);
      done();
    });
  })
})

describe('.send(string)', function(){
  it('should convert to a buffer', function(done){
    s.once('message', function(msg){
      assert('string' == typeof msg);
      assert('Hello' == msg);
      done();
    });

    c.send('Hello');
  })
})

describe('.send(object)', function(){
  it('should json stringify and convert to a buffer', function(done){
    s.once('message', function(msg){
      assert('object' == typeof msg);
      assert('world' == msg.hello);
      done();
    });

    c.send({ hello: 'world' });
  })
})