module.exports = {
    rules : {
        // encourages use of dot notation whenever possible
        'dot-notation': ['error', { allowKeywords: true }],
        // disallow use of undeclared variables unless mentioned in a /*global */ block
        'no-undef': 'error',
        // allow just one var statement per function
        'one-var': ['error', 'never'],
    }
}
