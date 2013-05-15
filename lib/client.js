
/**
 * Module dependencies.
 */

var types = require('./types');
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
 * Send `msg` with optional callback `fn`.
 *
 * @param {Buffer|String|Object} msg
 * @param {Function} fn
 * @api public
 */

Client.prototype.send = function(msg, fn){
  if (!msg) throw new TypeError('message required');
  var buf = pack(msg);
  this.sock.send(buf, 0, buf.length, this.addr.port, this.addr.hostname, fn);
};

/**
 * Pack `msg` as:
 *
 *      8        N
 *   +-----------------+
 *   | type | data ... |
 *   +-----------------+
 *
 * @param {Mixed} msg
 * @return {Buffer}
 * @api private
 */

function pack(msg) {
  var t = type(msg);

  // string
  if (types.string == t) {
    var buf = new Buffer(Buffer.byteLength(msg) + 1);
    buf[0] = t;
    buf.write(msg, 1);
    return buf;
  }

  // json
  if (types.json == t) {
    var json = JSON.stringify(msg);
    var buf = new Buffer(Buffer.byteLength(json) + 1);
    buf[0] = t;
    buf.write(json, 1);
    return buf;
  }

  // buffer
  var buf = new Buffer(msg.length + 1);
  buf[0] = t;
  msg.copy(buf, 1);
  return buf;
}

/**
 * Return message type for `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function type(obj) {
  if (Buffer.isBuffer(obj)) return types.buffer;
  if ('string' == typeof obj) return types.string;
  return types.json;
}
