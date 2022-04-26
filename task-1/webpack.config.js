const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const RULES = [
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: ['file-loader'],
  },
]

const serverConfig = (env, options) => ({
  ...(options.mode === 'development' ? {devtool: 'source-map'} : {}),
  target: 'node',
  entry: {
    'server': './src/server/index.ts',
  },
  module: {
    rules: [
      ...RULES
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    ...(options.mode === 'development' ? {devtoolModuleFilenameTemplate: '[absolute-resource-path]'} : {}),
  },
  plugins: [
    ...(options.watch ? [
      new NodemonPlugin({
        script: path.resolve(__dirname, 'dist', 'server.bundle.js'),
        watch: path.resolve(__dirname, 'dist'),
      }),
    ] : []),
  ]
});

const clientConfig = (env, options) => ({
  ...(options.mode === 'development' ? {devtool: 'source-map'} : {}),
  context: path.resolve(__dirname, 'src'),
  target: 'web',
  entry: {
    'base': './client/index.ts',
  },
  module: {
    rules: [
      ...RULES,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    ...(options.mode === 'development' ? {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    } : {}),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Notes',
      template: './client/index.html',
      filename: `index.html`,
      chunks: ['base']
    }),
    new CleanWebpackPlugin({
    }),
  ],
})

module.exports = [serverConfig, clientConfig];
