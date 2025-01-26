const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point for your app
  output: {
    path: path.resolve(__dirname, "dist"), // Output folder
    filename: "bundle.js", // Output file name
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Source HTML file
      filename: "index.html", // Output HTML file in 'dist'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these extensions
  },
  mode: "development", // Set development mode
};