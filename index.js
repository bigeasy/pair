var encoders = require('encode')

function option (keys, options) {
    var option
    for (var i = 0; i < options.length; i++) {
        for (var j = 0; j < keys.length; j++) {
            option = options[i][keys[j]]
            if (option != null) {
                return option
            }
        }
    }
}

function getKeyEncoder (options) {
    return encoders[option([ 'keyEncoding' ], options) || 'utf8']
}

function getValueEncoder (options) {
    return encoders[option([ 'valueEncoding', 'encoding' ], options) || 'utf8']
}

var pair = module.exports = {
    record: function (key, value, operation, version, options) {
        return {
            key: getKeyEncoder(options).encode(key),
            value: getValueEncoder(options).encode(value),
            operation: operation,
            version: version
        }
    },
    key: function (key, version, options) {
        return {
            value: getKeyEncoder(options).encode(key),
            version: version
        }
    },
    serialize: {
        key: function (key) {
            var header = [ key.version || 0 ].join(' ') + ' '
            var buffer = new Buffer(Buffer.byteLength(header) + key.value.length)
            buffer.write(header)
            new Buffer(key.value).copy(buffer, Buffer.byteLength(header))
            return buffer
        }
    }
}
