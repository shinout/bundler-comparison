
function *convertExtension(name) {
    yield name
    yield `${name}.js`
}

function *convertRelative(name) {
    yield name
    yield `./${name}`
}

function *convertFile(name) {
    for (const nameExt of convertExtension(name)) {
        yield* convertRelative(nameExt)
    }
}

function *getMainFile() {
    for (const mainFile of ['file1', 'file3']) {
        yield* convertFile(mainFile)
    }
}

function *getPkgJsonSetting() {

    for (const main of getMainFile()) {
        for (const leftFile of convertFile('file1')) {
            for (const rightFile of convertFile('file2')) {
                yield {
                    main,
                    browser: { [leftFile]: rightFile }
                }
            }
        }
    }
}

module.exports = getPkgJsonSetting
