
/**
 * Module dependencies.
 */

var Message = require('amp-message');
var dgram = require('dgram');
var url = require('url');

/**
 * Expose `Client`.
 */

module.exports = Client;

/**
 * Initialize a new `Client` with `addr`.
 *
 * @param {String} addr
 * @api public
 */

function Client(addr) {
  if (!(this instanceof Client)) return new Client(addr);
  this.addr = url.parse('udp://' + addr);
  this.sock = dgram.createSocket('udp4');
}

/**
 * Send `msg`.
 *
 * @param {Buffer|String|Object} msg...
 * @callback Optional
 * @api public
 */

Client.prototype.send = function() {
  var args = [].slice.call(arguments);
  var fn = typeof args[args.length - 1] == 'function' ? args.pop() : null;

  var msg = new Message(args);
  var buf = msg.toBuffer();

  this.sock.send(buf, 0, buf.length, this.addr.port, this.addr.hostname, fn);
};