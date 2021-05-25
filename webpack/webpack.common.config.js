const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output = {
  filename: '[name].bundle.js',
  path: path.join(__dirname, '..', 'dist'),
};

const config = {
  entry: {
    background: path.join(__dirname, '..', 'src', 'background.js'),
    content: path.join(__dirname, '..', 'src', 'content.js'),
    popup: path.join(__dirname, '..', 'src', 'popup', 'index.js'),
  },
  target: 'web',
  output,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: 'file-loader?name=media/[name].[ext]',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.jsx', '.js', '.css'],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'popup', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/resources',
          to: '',
        },
        {
          from: 'src/manifest.json',
          to: 'manifest.json',
        },
      ],
    }),
  ],
};
module.exports = config;
