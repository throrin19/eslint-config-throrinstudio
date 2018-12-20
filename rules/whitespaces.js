module.exports = {
    rules : {
        // this option sets a specific tab width for your code
        // http://eslint.org/docs/rules/indent
        indent: ['error', 4, {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          // MemberExpression: null,
          // CallExpression: {
            // parameters: null,
          // },
          FunctionDeclaration: {
            parameters: 1,
            body: 1
          },
          FunctionExpression: {
            parameters: 1,
            body: 1
          }
        }],
        // require a space before & after certain keywords
        'keyword-spacing': ['error', {
          before: true,
          after: true,
          overrides: {
            return: { after: true },
            throw: { after: true },
            case: { after: true }
          }
        }],
        // require spaces around operators
        'space-infix-ops': 'error',
        // enforce newline at the end of file, with no multiple empty lines
        'eol-last': ['error', 'always'],
        // enforces new line after each method call in the chain to make it
        // more readable and easy to maintain
        // http://eslint.org/docs/rules/newline-per-chained-call
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
        // disallow whitespace before properties
        // http://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': 'error',
        // enforce padding within blocks
        'padded-blocks': ['error', 'never'],
        // require or disallow spaces inside parentheses
        'space-in-parens': ['error', 'never'],
        // enforce spacing inside array brackets
        'array-bracket-spacing': ['error', 'never'],
        // require padding inside curly braces
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', 125, 2, {
          ignoreUrls: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
        "key-spacing" : [ 1, {
            beforeColon : true,
            afterColon  : true,
            align: "colon",
            mode: "minimum"
        }],
        'rest-spread-spacing' : ["error"],
    }
};
