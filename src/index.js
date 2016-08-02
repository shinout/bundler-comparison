const fs = require('fs')
const pkgJsonGenerator = require('./pkg-json-generator')
const runBrowserify = require('./run-browserify')
const runWebpack = require('./run-webpack')
const runRnPackager = require('./run-rn-packager')

function main() {

    function *run() {

        console.log(['main', 'from', 'to', 'browserify', 'webpack', 'rn-packager'].join('\t'))
        for (const pkg of pkgJsonGenerator()) {
            fs.writeFileSync(__dirname + '/../foo-module/package.json', JSON.stringify(pkg))
            const results = yield checkBundlers()
            console.log(toRow({ pkg, results }))
        }
    }

    const iter = run()

    function checkBundlers() {
        return Promise.all([
            runBrowserify(),
            runWebpack(),
            runRnPackager(),
        ]).then(results => iter.next(results))
    }

    iter.next()
}

function toRow({ pkg, results }) {
    const from = Object.keys(pkg.browser)[0]
    const to = pkg.browser[from]
    return [pkg.main, from, to, ...results].join('\t')
}

main()
