const isProduction = process.env.NODE_ENV !== "production";
const path = require("path");
const miniCSS = require("mini-css-extract-plugin");
const miniHTML = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const uglifyJS = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: isProduction ? "development" : "production",
  entry: "./src/components/Main.js",
  output: {
    filename: "js/[name].[chunkhash].js",
    path: path.resolve(__dirname, "./build"),
    chunkFilename: "js/chunk[name].[chunkhash].js"
  },
  devServer: {
    port: 2020,
    open: "chrome"
  },
  optimization: {
    minimizer: [new uglifyJS()]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: miniCSS.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCSS({
      filename: "style/style.css"
    }),
    new miniHTML({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
