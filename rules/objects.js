module.exports = {
    rules : {
        // disallow use of the Object constructor
        'no-new-object': 'error',
        // require method and property shorthand syntax for object literals
        // http://eslint.org/docs/rules/object-shorthand
        'object-shorthand': ['error', 'always', {
          ignoreConstructors: false,
          avoidQuotes: true,
        }],
        // require quotes around object literal property names
        // http://eslint.org/docs/rules/quote-props.html
        'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
    }
};
