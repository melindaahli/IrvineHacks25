const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your app
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Output bundle
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: "./dist", // Serve from dist folder
    port: 3000,
  },
  mode: "development",
};