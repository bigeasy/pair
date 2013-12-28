require('proof')(1, function (equal) {
    var pair = require('../..')
    equal(pair.extract({ key: new Buffer('a') }).toString(), 'a', 'extract')
})
