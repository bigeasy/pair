require('proof')(3, function (equal) {
    var pair = require('../..'), record
    record = pair.key('a', 0, [ {}, { keyEncoding: 'utf-8' } ])
    equal(record.value.toString(), 'a', 'value')
    equal(record.version, 0, 'version')
    record = pair.key(new Buffer('a'), 0, [ {}, { keyEncoding: 'utf-8' } ])
    equal(record.value.toString(), 'a', 'buffer value')
})
