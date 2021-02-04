const base = require('./index');

module.exports = {
    plugins : ['import'],
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
