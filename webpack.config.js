const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const Dotenv = require("dotenv-webpack");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });
require("dotenv").config(); // Load base .env

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/main.tsx",
  mode: isDevelopment ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: process.env.PUBLIC_URL || "http://localhost:3003/",
    clean: true,
  },
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared/types": path.resolve(__dirname, "../shared-types/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV || "development"}`,
      safe: false,
      systemvars: true,
      defaults: ".env",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Game Hub",
    }),
    new container.ModuleFederationPlugin({
      name: "game_hub",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./actions": "./src/actions.ts",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
        axios: { singleton: true, requiredVersion: "^1.13.2" },
      },
    }),
  ],
  devtool: isDevelopment ? "source-map" : false,
};
