const base = require('./index');

module.exports = {
    parser  : "babel-eslint",
    parserOptions : {
        sourceType : "module"
    },
    plugins : [
        "html",
        "vue",
        "import"
    ],
    extends : base.extends,
    root : true,
    env  : {
        es6      : true,
        commonjs : true,
        node     : true,
        mocha    : true,
        browser  : true
    }
};
