
/**
 * Module dependencies.
 */

var Message = require('amp-message');
var Emitter = require('events').EventEmitter;
var dgram = require('dgram');
var url = require('url');

/**
 * Expose `Server`.
 */

module.exports = Server;

/**
 * Initialize a `Server` with the given `addr`.
 *
 * @param {String} addr
 * @api public
 */

function Server(addr) {
  if (!(this instanceof Server)) return new Server(addr).bind();
  this.addr = url.parse('udp://' + addr);
  this.onmessage = this.onmessage.bind(this);
  this.sock = dgram.createSocket('udp4');
  this.info = null;
}

/**
 * Inherit from `Emitter.prototype`.
 */

Server.prototype.__proto__ = Emitter.prototype;

/**
 * Bind.
 *
 * @api private
 */

Server.prototype.bind = function(){
  this.sock.bind(this.addr.port, this.addr.hostname);
  this.sock.on('message', this.onmessage);
  return this;
};

/**
 * Handle messages.
 *
 * @api private
 */

Server.prototype.onmessage = function(buf, rinfo){
  var msg = new Message(buf);
  msg.args.unshift('message');
  this.info = rinfo;
  this.emit.apply(this, msg.args);
};
