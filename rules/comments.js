module.exports = {
    rules : {
        // require or disallow a space immediately following the // or /* in a comment
        // http://eslint.org/docs/rules/spaced-comment
        'spaced-comment': ['error', 'always', {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!'], // space here to support sprockets directives
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!'], // space here to support sprockets directives
            balanced: false,
          }
        }],
    }
};
