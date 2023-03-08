const base = require('./index');

module.exports = {
    extends : [
        ...base.extends,
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
