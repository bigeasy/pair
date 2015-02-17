require('proof')(9, prove)

function prove (assert) {
    var pair = require('../..'), buffer = new Buffer(1024)

    var key, record, length

    key = { value: new Buffer('a'), version: 0xaaaaaaaa }

    key = pair.serializers.key.serialize(key)
    length = pair.serializers.key.sizeOf(key)
    pair.serializers.key.write(key, buffer, 11, 11 + length)

    key = pair.deserializers.key(buffer, 11, 11 + length)

    assert(key.value.toString(), 'a', 'io key value')
    assert(key.version, 0xaaaaaaaa, 'io key version')

    record = {
        key: new Buffer('a'),
        value: new Buffer('b'),
        operation: 'put',
        version: 0xaaaaaaaa
    }

    record = pair.serializers.record.serialize(record)
    length = pair.serializers.record.sizeOf(record)
    pair.serializers.record.write(record, buffer, 11, 11 + length)

    record = pair.deserializers.record(buffer, 11, 11 + length)

    assert(record.key.toString(), 'a', 'io put record key')
    assert(record.value.toString(), 'b', 'io put record value')
    assert(record.version, 0xaaaaaaaa, 'io put record version')
    assert(record.operation, 'put', 'io put record operation')

    record = {
        key: new Buffer('a'),
        operation: 'del',
        version: 0xaaaaaaaa
    }

    record = pair.serializers.record.serialize(record)
    length = pair.serializers.record.sizeOf(record)
    pair.serializers.record.write(record, buffer, 11, 11 + length)

    record = pair.deserializers.record(buffer, 11, 11 + length)

    assert(record.key.toString(), 'a', 'io del record key')
    assert(record.version, 0xaaaaaaaa, 'io del record version')
    assert(record.operation, 'del', 'io del record operation')
}
