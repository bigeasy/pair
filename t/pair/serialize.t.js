require('proof')(3, function (equal) {
    var pair = require('../..'), key, record
    key = { value: new Buffer('a'), version: 0 }
    equal(pair.serialize.key(key).toString(), '0 a', 'serialize key')

    record = { key: new Buffer('a'), value: new Buffer('z'), operation: 'put', version: 0 }
    equal(pair.serialize.record(record).toString(), '0 put 1 az', 'serialize record')

    record = { key: new Buffer('a'), operation: 'del', version: 0 }
    equal(pair.serialize.record(record).toString(), '0 del 1 a', 'serialize record deletion')
})
