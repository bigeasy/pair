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

var pair = module.exports = {
    record: function (key, value, operation, version, options) {
        key = Buffer.isBuffer(key) ? key : pair.encoder.key(options).encode(String(key))
        if (operation == 'del') {
            value = (void(0))
        } else {
            value = Buffer.isBuffer(value)
                  ? value
                  : pair.encoder.value(options).encode(String(value))
        }
        return { key: key, value: value, operation: operation, version: version }
    },
    key: function (key, version, options) {
        key = Buffer.isBuffer(key) ? key : pair.encoder.key(options).encode(String(key))
        return { value: key, version: version }
    },
    extract: function (record) {
        return record.key
    },
    compare: function (left, right) {
        var I = left.length
        var compare = I - right.length
        if (compare === 0) {
            for (var i = 0; i < I; i++) {
                if (compare = left[i] - right[i]) {
                    break
                }
            }
        }
        return compare
    },
    encoder: {
        key: function (options) {
            return encoders[option([ 'keyEncoding' ], options) || 'utf8']
        },
        value: function (options) {
            return encoders[option([ 'valueEncoding', 'encoding' ], options) || 'utf8']
        }
    },
    serializers: {
        key: {
            serialize: function (key) {
                return key
            },
            sizeOf: function (key) {
                return key.value.length + 4
            },
            write: function (key, buffer, offset, length) {
                buffer.writeUInt32BE(key.version, offset, true)
                key.value.copy(buffer, offset + 4, 0, key.value.length)
            }
        },
        record: {
            serialize: function (record) {
                return record
            },
            sizeOf: function (record) {
                return (record.operation == 'del' ? 0 : record.value.length) +
                       record.key.length + 12
            },
            write: function (record, buffer, offset, length) {
                buffer.writeUInt32BE(record.version, offset + 0, true)
                buffer.writeUInt32BE(record.operation === 'put' ? 1 : 0, offset + 4, true)
                buffer.writeUInt32BE(record.key.length, offset + 8, true)
                record.key.copy(buffer, offset + 12, 0, record.key.length)
                if (record.operation === 'put') {
                    record.value.copy(buffer, offset + 12 + record.key.length, 0, record.value.length)
                }
            }
        }
    },
    deserializers: {
        key: function (buffer, start, end) {
            return {
                version: buffer.readUInt32BE(start, true),
                value: new Buffer(buffer.slice(start + 4, end))
            }
        },
        record: function (buffer, start, end) {
            var version = buffer.readUInt32BE(start, true)
            var operation = buffer.readUInt32BE(start + 4, true) ? 'put' : 'del'
            var keyLength = buffer.readUInt32BE(start + 8, true)
            var key = new Buffer(buffer.slice(start + 12, start + 12 + keyLength))
            if (operation == 'put') {
                return {
                    version: version,
                    operation: operation,
                    key: key,
                    value: buffer.slice(start + 12 + keyLength, end)
                }
            }
            return {
                version: version,
                operation: operation,
                key: key
            }
        }
    }
}
