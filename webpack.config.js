const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { ProvidePlugin } = require("webpack");

const ts = require("typescript");

const tsconfigRaw = ts.readConfigFile("tsconfig.json", ts.sys.readFile).config;

module.exports = {
  // mode: "development",

  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, `./dist/`),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },

  module: {
    rules: [
      // Use esbuild as a Babel alternative
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          tsconfigRaw,
        },
      },
      {
        test: /\.tsx$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          tsconfigRaw,
        },
      },
    ],
  },

  optimization: {
    minimize: false,
    // minimizer: [
    //   // Use esbuild to minify
    //   new ESBuildMinifyPlugin(),
    // ],
  },

  plugins: [new HtmlWebpackPlugin()],
};
