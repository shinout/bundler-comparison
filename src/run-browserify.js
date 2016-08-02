const browserify = require('browserify')

function bundle() {
    const b = browserify()
    b.add(__dirname + '/entry.js')
    return new Promise((y, n) => b.bundle((e, o) => e ? n(e) : y(o)))
}

function getResult() {
    return bundle().then(result => result.toString().indexOf('// file2') >= 0)
    .catch(e => {
        return null
    })
}

module.exports = getResult
