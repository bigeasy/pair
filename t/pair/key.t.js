require('proof')(2, function (equal) {
    var pair = require('../..')
    var record = pair.key('a', 0, [ { keyEncoding: 'utf-8' } ])
    equal(record.value.toString(), 'a', 'value')
    equal(record.version, 0, 'version')
})
