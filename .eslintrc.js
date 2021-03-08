/* global module */
module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/esnext',
		'plugin:@wordpress/eslint-plugin/jsx-a11y',
		'plugin:@wordpress/eslint-plugin/react',
	],
	env: {
		browser: true,
	},
	globals: {
		wp: true,
	},
	ignorePatterns: [
		'.eslintrc.js',
		'themes/print/js/build/*.js',
	],
	parserOptions: {
		'ecmaVersion': 12,
	},
	rules: {
		'no-console': [ 'warn', { allow: [ 'error' ] } ],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
