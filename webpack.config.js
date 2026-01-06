const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        dashboard: path.resolve(__dirname, 'src/dashboard/index.jsx'),
        settings: path.resolve(__dirname, 'src/settings/index.jsx'),
        feedback: path.resolve(__dirname, 'src/feedback/index.jsx'),
    },
    output: {
        ...defaultConfig.output,
        path: path.resolve(__dirname, 'build'),
    },
};

