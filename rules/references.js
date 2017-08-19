module.exports = {
    rules : {
        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': ['error', {
            destructuring: 'any',
            ignoreReadBeforeAssign: true,
        }],
        // disallow modifying variables that are declared using const
        'no-const-assign': 'error',
        // require let or const instead of var
        'no-var': 'error',
        // require use of the second argument for parseInt()
        radix: 'error',
    }
};
