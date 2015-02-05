require('proof')(1, prove)

function prove (assert) {
    var pair = require('../..')
    assert(pair.extract({ key: new Buffer('a') }).toString(), 'a', 'extract')
}
