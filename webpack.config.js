const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const WooCommerceDependencyExtractionWebpackPlugin = require( '@woocommerce/dependency-extraction-webpack-plugin' );

module.exports = {
  ...defaultConfig,
  
  entry: {
    'admin': "./src/admin.js", // Entry point for the admin settings page
    'public': "./src/public.js", // Entry point for the public settings page
    'woocommerce/min-quantity/index': "./src/woocommerce/min-quantity/index.js", // Entry point for the woocommerce blocks
    'woocommerce/max-quantity/index': "./src/woocommerce/max-quantity/index.js", // Entry point for the woocommerce blocks
    'blocks/section/index': "./src/blocks/section/index.js", // Entry point for the gutenberg blocks
    'blocks/row/index': "./src/blocks/row/index.js", // Entry point for the gutenberg blocks
    'blocks/column/index': "./src/blocks/column/index.js", // Entry point for the gutenberg blocks
    'blocks/recent-posts/index': "./src/blocks/recent-posts/index.js", // Entry point for the gutenberg blocks
  },
  output: {
    filename: '[name].js', // Output files will be named after the entry point keys
    path: __dirname + '/build', // Output directory
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    ...defaultConfig.resolve,
    fallback: {
      ...defaultConfig.resolve.fallback,
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer/"),
    },
    extensions: [".js", ".jsx"], // Add .jsx to extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Include both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Add this rule to handle .css files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i, // Add this rule to handle .scss and .sass files
        use: [
          "style-loader", // Injects styles into the DOM
          "css-loader", // Turns CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
    ],
  },
  
  plugins: [
    ...defaultConfig.plugins.filter(
      (plugin) =>
        plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
    ),
    new WooCommerceDependencyExtractionWebpackPlugin(),
  ],
};
