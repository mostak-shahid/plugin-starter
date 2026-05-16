const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SemiPlugin = require("@douyinfe/semi-webpack-plugin").default;
const { ModuleFederationPlugin } = require("webpack").container;


module.exports = {
    ...defaultConfig,

    entry: {
        index: './assets/src/index.js'
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/build',
    },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
    new SemiPlugin({
        cssLayer: true
    }),
  ],

  mode: "production",
};
