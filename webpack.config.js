const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const port = process.env.PORT || 3000;

module.exports = (env) => {
  return {
    mode: "development",
    entry: {
      vendor: ["semantic-ui-react"],
      app: "./src/index.js",
    },
    output: {
      filename: "[name].js",
      publicPath: "/",
    },
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
          vendor: {
            chunks: "initial",
            test: "vendor",
            name: "vendor",
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new Dotenv({
        path: `./.env${env.file ? `.${env.file}` : ""}`,
      }),
    ],
    devServer: {
      host: "localhost",
      port: port,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
  };
};
