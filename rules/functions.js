module.exports = {
    rules : {
        // enforces use of function declarations or expressions
        // http://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],
        // require immediate function invocation to be wrapped in parentheses
        // http://eslint.org/docs/rules/wrap-iife.html
        'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
        // disallow creation of functions within loops
        'no-loop-func': 'error',
        // use rest parameters instead of arguments
        // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-rest-params': 'error',
        // disallow use of new operator for Function object
        'no-new-func': 'error',
        // require or disallow space before function opening parenthesis
        // http://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': ['error', {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }],
        // require or disallow space before blocks
        'space-before-blocks': 'error',
        // disallow reassignment of function parameters
        // disallow parameter object manipulation
        // rule: http://eslint.org/docs/rules/no-param-reassign.html
        //'no-param-reassign': ['error', { props: true }],
        // suggest using the spread operator instead of .apply()
        // http://eslint.org/docs/rules/prefer-spread
        'prefer-spread': 'error',
        // disallow unreachable code after return, throw, continue, and break statements
        // https://eslint.org/docs/rules/no-unreachable
        'no-unreachable': 'error',
        // disallow assignment operators in conditional statements
        // https://eslint.org/docs/rules/no-cond-assign
        'no-cond-assign': 'error',
        // Disallow return before else
        'no-else-return' : 'error',
    }
};
