require('proof')(12, function (assert) {
    var pair = require('../..'), key, record

    key = pair.deserialize.key(new Buffer('0 a'))
    assert(key.value.toString(), 'a', 'key value')
    assert(key.value.length, 1, 'key length')
    assert(key.version, 0, 'key version')

    record = pair.deserialize.record(new Buffer('0 put 1 az'))
    assert(record.key.toString(), 'a', 'record key')
    assert(record.key.length, 1, 'record key length')
    assert(record.value.toString(), 'z', 'record value')
    assert(record.value.length, 1, 'record value length')
    assert(record.operation, 'put', 'record operation')
    assert(record.version, 0, 'key version')

    record = pair.deserialize.record(new Buffer('0 del 1 a'))
    assert(record.value == null, 'value is null')

    record = pair.deserializer(new Buffer('0 put 1 az'))
    assert(record.value, 'z')

    key = pair.deserializer(new Buffer('0 a'), true)
    assert(key.value, 'a')
})
