require('proof')(2, function (ok) {
    var pair = require('../..')
    ok(pair.compare(new Buffer('a'), new Buffer('z')) < 0, 'less than')
    ok(pair.compare(new Buffer('a'), new Buffer('aa')) < 0, 'shorter than')
})
