const base = require('./index');

module.exports = {
    parser  : "eslint-multiple-parsers",
    parserOptions : {
        "parsers": [
            {
                "test": ".*\\.js$",
                "path": "babel-eslint",
                "options": {
                    "sourceType": "module",
                },
            },
            {
                "test": ".*\\.vue$",
                "path": "vue-eslint-parser",
                "options": {
                    "sourceType": "module",
                    "ecmaVersion": 2017,
                    "ecmaFeatures": {
                        "jsx": false,
                    },
                },
            },
        ],
    },
    plugins : [
        "html",
        "import",
    ],
    extends : [ 
        ...base.extends,
        'plugin:vue/recommended'
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
