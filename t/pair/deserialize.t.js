require('proof')(3, function (equal) {
    var pair = require('../..'), key, record

    key = pair.deserialize.key(new Buffer('0 a'))
    equal(key.value.toString(), 'a', 'key value')
    equal(key.value.length, 1, 'key length')
    equal(key.version, 0, 'key version')
})
