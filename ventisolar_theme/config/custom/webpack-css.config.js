// webpack.config.js
// Webpack uses this to work with directories
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { PATHS } = require("./paths");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  entry: glob.sync("./src/sass/**/*.scss").reduce((acc, path) => {
    let ignorePath = [/components/, /layouts/, /utils/];
    let entry = path.replace("./src/sass/", "");
    entry = entry.replace(".scss", "");
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
    filename: "css/[name].js",
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript
  // minifying and other things, so let's set mode to development
  // mode: 'development'
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
          },
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              additionalData:
                '@import "./src/sass/utils/_functions.scss"; @import "./src/sass/utils/_colors.scss"; @import "./src/sass/utils/_fonts.scss"; @import "./src/sass/utils/_units.scss"; @import "./src/sass/utils/_icons_variables.scss"; @import "./src/sass/utils/_mixins.scss";',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      //`...`,
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssnanoMinify,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/css/**/*"),
      ],
    }),
  ],
  mode: "production",
};
