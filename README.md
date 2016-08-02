# BundlerComparison
Show how three bundlers differ in parsing `browser` field of `package.json`.

- [browserify](https://github.com/substack/node-browserify)
- [webpack](http://webpack.github.io)
- [React Native Packager](https://github.com/facebook/react-native/tree/master/packager)

# Motivation
Those three bundlers parse `browser` field differently by

- Relative path (start with `./` or not)
- Extension (end with `.js` or not)
- `main` field

This package checks these compatibility by **all the possible patterns** of `package.json`.

# Result

## example

|main|from|to|browserify|webpack|rn-packager|
|---|---|---|---|---|---|
|file1|file1|file2|:ok:|:x:|:ok:|

The data row represents the following `package.json`.

```json
{
  "main": "file1",
  "browser": {
    "file1": "file2"
  }
}
```
- Column `main` is the value of `main` field.
- Column `from` is the first key of `browser` field.
- Column `to` is the value of `from`.

Bundlers except webpack successfully parse the module.

## All patterns
|main|from|to|browserify|webpack|rn-packager|
|---|---|---|---|---|---|
|file1|file1|file2|:ok:|:x:|:ok:|
|file1|file1|./file2|:ok:|:x:|:ok:|
|file1|file1|file2.js|:ok:|:x:|:ok:|
|file1|file1|./file2.js|:ok:|:x:|:ok:|
|file1|./file1|file2|:ok:|:x:|:x:|
|file1|./file1|./file2|:ok:|:x:|:x:|
|file1|./file1|file2.js|:ok:|:x:|:x:|
|file1|./file1|./file2.js|:ok:|:x:|:x:|
|file1|file1.js|file2|:x:|:x:|:ok:|
|file1|file1.js|./file2|:x:|:ok:|:ok:|
|file1|file1.js|file2.js|:x:|:x:|:ok:|
|file1|file1.js|./file2.js|:x:|:ok:|:ok:|
|file1|./file1.js|file2|:x:|:x:|:x:|
|file1|./file1.js|./file2|:x:|:ok:|:x:|
|file1|./file1.js|file2.js|:x:|:x:|:x:|
|file1|./file1.js|./file2.js|:x:|:ok:|:x:|
|./file1|file1|file2|:x:|:x:|:x:|
|./file1|file1|./file2|:x:|:x:|:x:|
|./file1|file1|file2.js|:x:|:x:|:x:|
|./file1|file1|./file2.js|:x:|:x:|:x:|
|./file1|./file1|file2|:ok:|:x:|:ok:|
|./file1|./file1|./file2|:ok:|:x:|:ok:|
|./file1|./file1|file2.js|:ok:|:x:|:ok:|
|./file1|./file1|./file2.js|:ok:|:x:|:ok:|
|./file1|file1.js|file2|:x:|:x:|:x:|
|./file1|file1.js|./file2|:x:|:ok:|:x:|
|./file1|file1.js|file2.js|:x:|:x:|:x:|
|./file1|file1.js|./file2.js|:x:|:ok:|:x:|
|./file1|./file1.js|file2|:x:|:x:|:ok:|
|./file1|./file1.js|./file2|:x:|:ok:|:ok:|
|./file1|./file1.js|file2.js|:x:|:x:|:ok:|
|./file1|./file1.js|./file2.js|:x:|:ok:|:ok:|
|file1.js|file1|file2|:x:|:x:|:ok:|
|file1.js|file1|./file2|:x:|:x:|:ok:|
|file1.js|file1|file2.js|:x:|:x:|:ok:|
|file1.js|file1|./file2.js|:x:|:x:|:ok:|
|file1.js|./file1|file2|:x:|:x:|:x:|
|file1.js|./file1|./file2|:x:|:x:|:x:|
|file1.js|./file1|file2.js|:x:|:x:|:x:|
|file1.js|./file1|./file2.js|:x:|:x:|:x:|
|file1.js|file1.js|file2|:ok:|:x:|:ok:|
|file1.js|file1.js|./file2|:ok:|:ok:|:ok:|
|file1.js|file1.js|file2.js|:ok:|:x:|:ok:|
|file1.js|file1.js|./file2.js|:ok:|:ok:|:ok:|
|file1.js|./file1.js|file2|:ok:|:x:|:x:|
|file1.js|./file1.js|./file2|:ok:|:ok:|:x:|
|file1.js|./file1.js|file2.js|:ok:|:x:|:x:|
|file1.js|./file1.js|./file2.js|:ok:|:ok:|:x:|
|./file1.js|file1|file2|:x:|:x:|:x:|
|./file1.js|file1|./file2|:x:|:x:|:x:|
|./file1.js|file1|file2.js|:x:|:x:|:x:|
|./file1.js|file1|./file2.js|:x:|:x:|:x:|
|./file1.js|./file1|file2|:x:|:x:|:ok:|
|./file1.js|./file1|./file2|:x:|:x:|:ok:|
|./file1.js|./file1|file2.js|:x:|:x:|:ok:|
|./file1.js|./file1|./file2.js|:x:|:x:|:ok:|
|./file1.js|file1.js|file2|:x:|:x:|:x:|
|./file1.js|file1.js|./file2|:x:|:ok:|:x:|
|./file1.js|file1.js|file2.js|:x:|:x:|:x:|
|./file1.js|file1.js|./file2.js|:x:|:ok:|:x:|
|./file1.js|./file1.js|file2|:ok:|:x:|:ok:|
|./file1.js|./file1.js|./file2|:ok:|:ok:|:ok:|
|./file1.js|./file1.js|file2.js|:ok:|:x:|:ok:|
|./file1.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|file3|file1|file2|:x:|:x:|:x:|
|file3|file1|./file2|:x:|:x:|:x:|
|file3|file1|file2.js|:x:|:x:|:x:|
|file3|file1|./file2.js|:x:|:x:|:x:|
|file3|./file1|file2|:x:|:x:|:ok:|
|file3|./file1|./file2|:ok:|:x:|:ok:|
|file3|./file1|file2.js|:x:|:x:|:ok:|
|file3|./file1|./file2.js|:ok:|:x:|:ok:|
|file3|file1.js|file2|:x:|:x:|:x:|
|file3|file1.js|./file2|:x:|:ok:|:x:|
|file3|file1.js|file2.js|:x:|:x:|:x:|
|file3|file1.js|./file2.js|:x:|:ok:|:x:|
|file3|./file1.js|file2|:x:|:x:|:ok:|
|file3|./file1.js|./file2|:x:|:ok:|:ok:|
|file3|./file1.js|file2.js|:x:|:x:|:ok:|
|file3|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|./file3|file1|file2|:x:|:x:|:x:|
|./file3|file1|./file2|:x:|:x:|:x:|
|./file3|file1|file2.js|:x:|:x:|:x:|
|./file3|file1|./file2.js|:x:|:x:|:x:|
|./file3|./file1|file2|:x:|:x:|:ok:|
|./file3|./file1|./file2|:ok:|:x:|:ok:|
|./file3|./file1|file2.js|:x:|:x:|:ok:|
|./file3|./file1|./file2.js|:ok:|:x:|:ok:|
|./file3|file1.js|file2|:x:|:x:|:x:|
|./file3|file1.js|./file2|:x:|:ok:|:x:|
|./file3|file1.js|file2.js|:x:|:x:|:x:|
|./file3|file1.js|./file2.js|:x:|:ok:|:x:|
|./file3|./file1.js|file2|:x:|:x:|:ok:|
|./file3|./file1.js|./file2|:x:|:ok:|:ok:|
|./file3|./file1.js|file2.js|:x:|:x:|:ok:|
|./file3|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|file3.js|file1|file2|:x:|:x:|:x:|
|file3.js|file1|./file2|:x:|:x:|:x:|
|file3.js|file1|file2.js|:x:|:x:|:x:|
|file3.js|file1|./file2.js|:x:|:x:|:x:|
|file3.js|./file1|file2|:x:|:x:|:ok:|
|file3.js|./file1|./file2|:ok:|:x:|:ok:|
|file3.js|./file1|file2.js|:x:|:x:|:ok:|
|file3.js|./file1|./file2.js|:ok:|:x:|:ok:|
|file3.js|file1.js|file2|:x:|:x:|:x:|
|file3.js|file1.js|./file2|:x:|:ok:|:x:|
|file3.js|file1.js|file2.js|:x:|:x:|:x:|
|file3.js|file1.js|./file2.js|:x:|:ok:|:x:|
|file3.js|./file1.js|file2|:x:|:x:|:ok:|
|file3.js|./file1.js|./file2|:x:|:ok:|:ok:|
|file3.js|./file1.js|file2.js|:x:|:x:|:ok:|
|file3.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|./file3.js|file1|file2|:x:|:x:|:x:|
|./file3.js|file1|./file2|:x:|:x:|:x:|
|./file3.js|file1|file2.js|:x:|:x:|:x:|
|./file3.js|file1|./file2.js|:x:|:x:|:x:|
|./file3.js|./file1|file2|:x:|:x:|:ok:|
|./file3.js|./file1|./file2|:ok:|:x:|:ok:|
|./file3.js|./file1|file2.js|:x:|:x:|:ok:|
|./file3.js|./file1|./file2.js|:ok:|:x:|:ok:|
|./file3.js|file1.js|file2|:x:|:x:|:x:|
|./file3.js|file1.js|./file2|:x:|:ok:|:x:|
|./file3.js|file1.js|file2.js|:x:|:x:|:x:|
|./file3.js|file1.js|./file2.js|:x:|:ok:|:x:|
|./file3.js|./file1.js|file2|:x:|:x:|:ok:|
|./file3.js|./file1.js|./file2|:x:|:ok:|:ok:|
|./file3.js|./file1.js|file2.js|:x:|:x:|:ok:|
|./file3.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|

## All passed patterns
|main|from|to|browserify|webpack|rn-packager|
|---|---|---|---|---|---|
|file1.js|file1.js|./file2|:ok:|:ok:|:ok:|
|file1.js|file1.js|./file2.js|:ok:|:ok:|:ok:|
|./file1.js|./file1.js|./file2|:ok:|:ok:|:ok:|
|./file1.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|file3|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|./file3|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|file3.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|
|./file3.js|./file1.js|./file2.js|:ok:|:ok:|:ok:|


# Conclusion
- `to` must contain `./`
- `from` must contain `.js`
- `main` and `from` must be the same when replacing `main`
- any `main` patterns are ok when not replacing `main`
- `from` must contain `./` unless it's the same as `main`


# Usage
(requires Node v6 or later)

```sh
git clone https://github.com/shinout/bundler-comparison
cd bundler-comparison
npm install
npm start
```

`npm start` will show TSV of the compatibility.
