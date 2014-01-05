require('proof')(6, function (equal, ok) {
    var pair = require('../..'), record
    record = pair.record('a', 'z', 'put', 0, [])
    equal(record.key.toString(), 'a', 'key')
    equal(record.value.toString(), 'z', 'value')
    equal(record.operation, 'put', 'operation')
    equal(record.version, 0, 'version')
    record = pair.record('a', 'z', 'del', 0, [])
    ok(record.value == null, 'del')
    record = pair.record(new Buffer('a'), 'z', 'put', 0, [])
    equal(record.key.toString(), 'a', 'key as buffer')
})
