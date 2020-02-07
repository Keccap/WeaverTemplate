module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    '$': true,
    'jQuery': true,
    'ymaps': true,
    'YT': true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'import',
    'vue'
  ],
  rules: {
    'array-callback-return': ['error', { allowImplicit: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'computed-property-spacing': ['error', 'never'],
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
    'function-paren-newline': ['error', 'multiline'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'import/no-mutable-exports': 'error',
    'import/prefer-default-export': 'error',
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-confusing-arrow': 'error',
    'no-console': 1,
    'no-duplicate-imports': ['error', { 'includeExports': true }],
    'no-else-return': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': ['error', {
      groups: [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
      allowSamePrecedence: false
    }],
    'no-multi-assign': ['error'],
    'no-nested-ternary': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': ['error', { 'props': true }],
    'no-plusplus': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-var': 'error',
    'object-shorthand': ['error', 'always', { 'avoidQuotes': true }],
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-linebreak': 'off',
    'prefer-arrow-callback': 'error',
    'prefer-destructuring': ['error', { 'array': false, 'object': true }, { 'enforceForRenamedProperties': true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'radix': ['error', 'always'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'template-curly-spacing': ['error', 'always'],
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off'
  }
};
