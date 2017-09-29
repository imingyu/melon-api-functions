var resolve = require('rollup-plugin-node-resolve');
var babel = require('rollup-plugin-babel');
var json = require('rollup-plugin-json');
var commonjs = require('rollup-plugin-commonjs');

var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './modules/index.js'),
    dest: path.resolve(__dirname, './dist/index.js'),
    format: 'umd',
    moduleName: 'MelonApiFunctions',
    sourceMap: true,
    external: ['moment'],
    plugins: [
        json(),
        resolve({
            jsnext: true
        }),
        commonjs(),
        babel()
    ]
};