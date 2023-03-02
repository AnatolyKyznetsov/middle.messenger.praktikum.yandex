module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
                'maxEOF': 0,
                'maxBOF': 0
            }
        ],
        'no-multi-spaces': 'error',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': [
            'error',
            'always'
        ],
        'max-len': [
            'error',
            {
                'code': 200,
            }
        ],
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    }
};
