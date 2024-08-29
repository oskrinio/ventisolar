// Webpack uses this to work with directories
const glob = require("glob");
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { PATHS } = require("./paths");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  entry: glob.sync("./src/js/**/*.js").reduce((acc, path) => {
    let ignorePath = [/_shared/, /libraries/];
    let entry = path.replace("./src/js/", "");
    entry = entry.replace(".js", "");
    let isMatch = ignorePath.some((rx) => rx.test(entry));
    if (isMatch) {
      return acc;
    }
    acc[entry] = path;
    return acc;
  }, {}),

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: PATHS.dist,
    publicPath: "",
    filename: "js/[name].min.js",
  },

  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // eslint-disable-next-line max-len
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          mangle: true,
        },
        extractComments: false,
      }),
    ],
  },
};
