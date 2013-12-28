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
    extract: function (record) {
        return record.key
    },
    compare: function (left, right) {
        for (var i = 0, I = Math.min(left.length, right.length); i < I; i++) {
            if (left[i] - right[i]) return left[i] - right[i]
        }
        return left.length - right.length
    },
    serialize: {
        key: function (key) {
            var header = [ key.version || 0 ].join(' ') + ' '
            var buffer = new Buffer(Buffer.byteLength(header) + key.value.length)
            buffer.write(header)
            new Buffer(key.value).copy(buffer, Buffer.byteLength(header))
            return buffer
        },
        record: function (record) {
            var value = record.operation == 'del' ? '' : record.value
            var header = [ record.version || 0, record.operation, record.key.length ].join(' ') + ' '
            var buffer = new Buffer(Buffer.byteLength(header) + record.key.length + value.length)
            buffer.write(header)
            new Buffer(record.key).copy(buffer, Buffer.byteLength(header))
            new Buffer(value).copy(buffer, Buffer.byteLength(header) + record.key.length)
            return buffer
        }
    },
    serializer: function (object, key) {
        return pair.serialize[key ? 'key' : 'record'](object)
    },
    deserialize: {
        key: function (buffer) {
            for (var i = 0; buffer[i] != 0x20; i++);
            var header = buffer.toString('utf8', 0, i).split(' ')
            var value = new Buffer(buffer.length - (i + 1))
            buffer.copy(value, 0, i + 1)
            return { value: value, version: +(header[0]) }
        },
        record: function (buffer) {
            for (var i = 0, count = 3; buffer[i] != 0x20 || --count; i++);
            var header = buffer.toString('utf8', 0, i).split(' ')
            var version = +(header[0]), operation = header[1], length = +(header[2])
            var key = new Buffer(length), value = null
            buffer.copy(key, 0, i + 1, i + 1 + length)
            if (operation == 'put') {
                value = new Buffer(buffer.length - (i + 1 + length))
                buffer.copy(value, 0, i + 1 + length)
            }
            return { key: key, value: value, version: version, operation: operation }
        }
    }
}
