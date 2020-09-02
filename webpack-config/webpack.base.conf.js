const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);

const PATH = {
  src: path.join(__dirname, `../src`),
  dist: path.join(__dirname, `../build`),
  assets: `assets/`,
};

module.exports = {
  externals: {
    paths: PATH,
  },
  entry: {
    app: PATH.src,
  },
  output: {
    filename: `${PATH.assets}js/[name].[contenthash].js`,
    path: PATH.dist,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: `vendors`,
          test: /node_modules/,
          chunks: `all`,
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: `file-loader`,
        options: {
          name: `${PATH.assets}fonts/[name].[ext]`,
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: `file-loader`,
        options: {
          name: `${PATH.assets}img/[name].[ext]`,
        },
      },
      {
        test: /\.scss$/,
        use: [
          `style-loader`,
          MiniCssExtractPlugin.loader,
          {
            loader: `css-loader`,
            options: {sourceMap: true, url: false},
          },
          {
            loader: `postcss-loader`,
            options: {sourceMap: true},
          },
          {
            loader: `sass-loader`,
            options: {sourceMap: true},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          `style-loader`,
          MiniCssExtractPlugin.loader,
          {
            loader: `css-loader`,
            options: {sourceMap: true},
          },
          {
            loader: `postcss-loader`,
            options: {sourceMap: true},
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      '~': `src`,
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATH.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: `${PATH.src}/${PATH.assets}img`, to: `${PATH.assets}img`},
        {from: `${PATH.src}/${PATH.assets}fonts`, to: `${PATH.assets}fonts`},
        {from: `${PATH.src}/static`, to: ``}
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/index.html`,
      filename: `./index.html`,
    }),
  ],
};
