module.exports = {
    rules : {
        'no-eval' : 'error',
        // specify whether double or single quotes should be used
        quotes: ['error', 'single', { avoidEscape: true }],
        // suggest using template literals instead of string concatenation
        // http://eslint.org/docs/rules/prefer-template
        'prefer-template': 'error',
        // enforce usage of spacing in template strings
        // http://eslint.org/docs/rules/template-curly-spacing
        'template-curly-spacing': 'error',
        // disallow unnecessary string escaping
        // http://eslint.org/docs/rules/no-useless-escape
        'no-useless-escape': 'error',
    }
};
