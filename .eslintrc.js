module.exports = {
	parser: 'babel-eslint',
	plugins: ['compat', 'jest', 'react-hooks'],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		es6: true,
		browser: true,
		'jest/globals': true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:jest/recommended',
	],
	globals: {
		__DEV__: true,
	},
};
