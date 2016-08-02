/** @see https://github.com/facebook/react-native/tree/master/packager */
const rnPackager = require('react-native/packager/react-packager')
const { dirname } = require('path')
const projectRoot = dirname(__dirname)

const options = {
    projectRoots: [projectRoot],
    polyfillModuleNames: [],
    assetRoots: [],
    transformModulePath: projectRoot + '/node_modules/react-native/packager/transformer.js',
}

const entryInfo = { entryFile: 'src/entry.js', platform: "ios" }

function getResult() {
    return rnPackager.getDependencies(options, entryInfo).then(results => {
        return results
            .map(result => result.path)
            .some(path => path === projectRoot + '/foo-module/file2.js')
    })
    .catch(e => {
        return null
    })
}

module.exports = getResult
