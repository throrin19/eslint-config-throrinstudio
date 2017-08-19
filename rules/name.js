module.exports = {
    rules : {
        // this option enforces minimum and maximum identifier lengths
        // (variable names, property names etc.)
        'id-length': 'off',
        // require camel case names
        camelcase: ['error', { properties: 'never' }],
        // require a capital letter for constructors
        'new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        }],
        // disallow dangling underscores in identifiers
        'no-underscore-dangle': ['error', { allowAfterThis: false }],
    }
};
