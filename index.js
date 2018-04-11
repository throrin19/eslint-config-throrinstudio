module.exports = {
    extends : [
        './rules/references',
        './rules/objects',
        './rules/arrays',
        './rules/strings',
        './rules/functions',
        './rules/arrowFunc',
        './rules/classes',
        './rules/modules',
        './rules/iterators',
        './rules/variables',
        './rules/comparison',
        './rules/comments',
        './rules/whitespaces',
        './rules/comma',
    ].map(require.resolve),
    root    : true,
    env : {
        es6      : true,
        commonjs : true,
        node     : true,
        mocha    : true,
        mongo    : true,
        browser  : true,
    },
    plugins : [
        'import',
    ],
    parserOptions: {
        ecmaVersion     : 2017,
        sourceType      : 'module',
        ecmaFeatures    : {
            experimentalObjectRestSpread : true,
        },
    },
};
