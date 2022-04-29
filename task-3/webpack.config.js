const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const serverConfig = (env, options) => ({
  ...(options.mode === 'development' ? {devtool: 'source-map'} : {}),
  target: 'node',
  entry: {
    'server': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
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

module.exports = serverConfig;
