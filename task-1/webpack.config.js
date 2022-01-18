const path = require('path');
const fs = require('fs');
const NodemonPlugin = require('nodemon-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.resolve(__dirname, 'src', 'client', 'pages');
const pages = fs.readdirSync(pagesDir).map(filename => new HtmlWebpackPlugin({
  template: path.resolve(pagesDir, filename),
  filename: `${filename}`,
  chunks: ['base', `${filename.split('.')[0]}`]
}));


module.exports = (env, options) => ({
  context: path.resolve(__dirname, 'src'),
  target: 'node',
  entry: {
    'server': './index.ts',
    'base': './client/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: pathData => pathData.chunk.name === 'server'
      ? '[name].bundle.js'
      : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    ...pages,
    ...(options.mode === 'development' ? [
      new NodemonPlugin({
        script: path.resolve(__dirname, 'dist', 'server.bundle.js'),
        watch: path.resolve(__dirname, 'dist'),
      }),
    ] : []),
    new CleanWebpackPlugin(),
  ],
});
