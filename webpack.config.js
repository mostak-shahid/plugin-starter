const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
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
};
