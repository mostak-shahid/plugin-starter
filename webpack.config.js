const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	watchOptions: {
		...defaultConfig.watchOptions,
		// Tell Webpack to completely ignore these paths for change tracking
		ignored: [
			'**/build/**',
			'**/node_modules/**',
			'**/.git/**'
		],
		// Optional: Gives a slight delay before triggering a build 
		// to allow multiple quick file saves to bundle together
		aggregateTimeout: 300,
	},
};
