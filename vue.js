const base = require('./index');

module.exports = {
    parser  : "vue-eslint-parser",
    parserOptions : {
        parser          : 'babel-eslint',
        sourceType      : 'module',
        ecmaVersion     : 2017,
        ecmaFeatures    : {
            jsx                          : false,
            experimentalObjectRestSpread : true,
        },
    },
    plugins : [
        "import",
    ],
    extends : [ 
        ...base.extends,
        'plugin:vue/recommended',
        './rules/vue/html.js',
        './rules/vue/component.js',
    ],
    root : true,
    env  : {
        es6      : true,
        commonjs : true,
        node     : true,
        mocha    : true,
        browser  : true,
    },
};
