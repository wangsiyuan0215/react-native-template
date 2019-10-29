module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true
    },
    globals: {
        GLOBAL: true,
        __DEV__: true
    },
    rules: {
        'react/jsx-indent': [2, "always"],
        'react/jsx-indent-props': [2, 'always'],
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'import/no-unresolved': [2, { ignore: ['^@/', '^umi/', '^root/', '^@'] }],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js']
            }
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'comma-style': [2, 'last'],
        'comma-dangle': [2, 'never'],
        'linebreak-style': 0,
        'no-underscore-dangle': 0,
        'no-throw-literal': 0
    },
    settings: {
        polyfills: ['fetch', 'promises', 'url', 'object-assign']
    }
};
