const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
    clean: true,
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
      filename: "app.css",
    }),
  ],

  mode: "production",
};
