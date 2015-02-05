require('proof')(9, prove)

function prove (assert) {
    var pair = require('../..'), record
    record = pair.record('a', 'z', 'put', 0, [])
    assert(record.key.toString(), 'a', 'key')
    assert(record.value.toString(), 'z', 'value')
    assert(record.operation, 'put', 'operation')
    assert(record.version, 0, 'version')
    record = pair.record('a', 'z', 'del', 0, [])
    assert(record.value == null, 'del')
    record = pair.record(new Buffer('a'), new Buffer('z'), 'put', 0, [])
    assert(record.key.toString(), 'a', 'key as buffer')
    assert(record.value.toString(), 'z', 'value as buffer')
    record = pair.record(1, 9, 'put', 0, [])
    assert(record.value.toString(), '9', 'value as number')
    assert(record.key.toString(), '1', 'key as number')
}
