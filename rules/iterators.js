module.exports = {
    rules : {
        // disallow usage of __iterator__ property
        'no-iterator': 'error',
        // disallow certain syntax forms
        // http://eslint.org/docs/rules/no-restricted-syntax
        'no-restricted-syntax': [
          'error',
          // 'ForInStatement',
          // 'ForOfStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        // enforce the spacing around the * in generator functions
        // http://eslint.org/docs/rules/generator-star-spacing
        'generator-star-spacing': ['error', { before: false, after: true }],
        // enforce one true brace style
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    }
};
