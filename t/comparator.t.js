require('proof')(3, prove)

function prove (assert) {
    var pair = require('..')
    assert(pair.compare(new Buffer('aaa'), new Buffer('aaz')) < 0, 'less than')
    assert(pair.compare(new Buffer('a'), new Buffer('aa')) < 0, 'shorter than')
    assert(pair.compare(new Buffer('b'), new Buffer('aa')) > 0, 'shorter greater than')
}
