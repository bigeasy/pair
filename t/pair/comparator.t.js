require('proof')(2, prove)

function prove (assert) {
    var pair = require('../..')
    assert(pair.compare(new Buffer('a'), new Buffer('z')) < 0, 'less than')
    assert(pair.compare(new Buffer('a'), new Buffer('aa')) < 0, 'shorter than')
}
