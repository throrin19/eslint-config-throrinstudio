module.exports = {
    rules : {
        // suggest using arrow functions as callbacks
        'prefer-arrow-callback': ['error', {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        }],
        // require space before/after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': ['error', { before: true, after: true }],
        // require parens in arrow function arguments
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': ['error', 'as-needed', {
          requireForBlockBody: true,
        }],
        // enforces no braces where they can be omitted
        // http://eslint.org/docs/rules/arrow-body-style
        // TODO: enable requireReturnForObjectLiteral?
        'arrow-body-style': ['error', 'as-needed', {
          requireReturnForObjectLiteral: false,
        }],
        // disallow arrow functions where they could be confused with comparisons
        // http://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': ['error', {
          allowParens: true,
        }],
    }
};
