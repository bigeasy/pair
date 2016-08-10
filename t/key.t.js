require('proof')(4, prove)

function prove (assert) {
    var pair = require('..'), record
    record = pair.key('a', 0, [ {}, { keyEncoding: 'utf-8' } ])
    assert(record.value.toString(), 'a', 'value')
    assert(record.version, 0, 'version')
    record = pair.key(new Buffer('a'), 0, [ {}, { keyEncoding: 'utf-8' } ])
    assert(record.value.toString(), 'a', 'value as buffer')
    record = pair.key(1, 0, [ {}, { keyEncoding: 'utf-8' } ])
    assert(record.value.toString(), '1', 'value as number')
}
