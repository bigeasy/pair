require('proof')(10, function (equal, ok) {
    var pair = require('../..'), key, record

    key = pair.deserialize.key(new Buffer('0 a'))
    equal(key.value.toString(), 'a', 'key value')
    equal(key.value.length, 1, 'key length')
    equal(key.version, 0, 'key version')

    record = pair.deserialize.record(new Buffer('0 put 1 az'))
    equal(record.key.toString(), 'a', 'record key')
    equal(record.key.length, 1, 'record key length')
    equal(record.value.toString(), 'z', 'record value')
    equal(record.value.length, 1, 'record value length')
    equal(record.operation, 'put', 'record operation')
    equal(record.version, 0, 'key version')

    record = pair.deserialize.record(new Buffer('0 del 1 a'))
    ok(record.value == null, 'value is null')
})
