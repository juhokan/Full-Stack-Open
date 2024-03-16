module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  extends: ['eslint:recommended'],
  plugins: ['@stylistic/js'],
  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/linebreak-style': ['error', 'unix'],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
  },
  overrides: [
    {
      files: ['.eslintrc.js', '.eslintrc.cjs'],
      env: {
        node: true
      },
      parserOptions: {
        sourceType: 'script'
      }
    }
  ]
}
