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
        './rules/vue/html-indent.js',
        './rules/vue/component-name-in-template-casing.js',
        './rules/vue/html-closing-bracket-newline.js',
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
