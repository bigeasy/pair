var pair = require('../pair')
var _pair = require('../_pair')
var crypto = require('crypto')
var Benchmark = require('benchmark')

var seedrandom = require('seedrandom')

var random = (function () {
    var random = seedrandom(0)
    return function (max) {
        return Math.floor(random() * max)
    }
})()

var shas = []

for (var i = 0; i < 1024 * 1024 + 1; i++) {
    var value = random(1024 * 256)
    sha = crypto.createHash('sha1')
    buffer = new Buffer(4)
    buffer.writeUInt32BE(value, 0)
    sha.update(buffer)
    shas.push(sha.digest())
}

var left = shas.shift()

var suite = new Benchmark.Suite('call', { /*minSamples: 100*/ })

function fn () {
    for (i = 0, I = shas.length; i < I; i++) {
        pair.compare(left, shas[i])
    }
}

function _fn () {
    for (i = 0, I = shas.length; i < I; i++) {
        _pair.compare(left, shas[i])
    }
}

_fn()

console.log('here')

for (var i = 1; i <= 3; i++)  {
    suite.add({
        name: '_pair compare ' + i,
        fn: _fn
    })

    suite.add({
        name: ' pair compare ' + i,
        fn: fn
    })
}

suite.on('cycle', function(event) {
    console.log(String(event.target));
})

suite.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})

suite.run()
