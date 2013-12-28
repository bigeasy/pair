require('proof')(4, function (equal) {
    var pair = require('../..')
    var record = pair.record('a', 'z', 'put', 0, [])
    equal(record.key.toString(), 'a', 'key')
    equal(record.value.toString(), 'z', 'value')
    equal(record.operation, 'put', 'operation')
    equal(record.version, 0, 'version')
})
