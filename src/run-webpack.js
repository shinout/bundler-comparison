const webpack = require('webpack')
const fs = require('fs')

require('./prepare-tmp-dir')

function bundle(entryPath, options) {
    const configuration = {
        entry: [__dirname + '/entry.js'],
        output: {
            filename: 'webpack-bundle.js',
            path: __dirname + '/../.tmp'
        }
    }
    const compiler = webpack(configuration)
    return new Promise((y, n) => compiler.run((e, o) => e ? n(e) : y(o)))
}

function getResult() {
    return bundle().then(() => {
        const code = fs.readFileSync(__dirname + '/../.tmp/webpack-bundle.js', 'utf8')
        return code.indexOf('// file2') >= 0
    })
    .catch(e => {
        return null
    })
}

module.exports = getResult
