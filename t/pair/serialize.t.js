require('proof')(1, function (equal) {
    var pair = require('../..')
    var key = { value: new Buffer('a'), version: 0 }
    equal(pair.serialize.key(key).toString(), '0 a', 'serialize key')
})
