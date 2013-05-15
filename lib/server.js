
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var types = require('./types');
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

Server.prototype.onmessage = function(msg, rinfo){
  this.emit('message', unpack(msg), rinfo);
};

/**
 * Unpack the given `msg`.
 *
 * @param {Buffer} msg
 * @return {Mixed}
 * @api private
 */

function unpack(msg) {
  var t = msg[0];

  // buffer
  if (types.buffer == t) return msg.slice(1);

  // string
  if (types.string == t) return msg.slice(1).toString();

  // json
  return JSON.parse(msg.slice(1).toString());
}
