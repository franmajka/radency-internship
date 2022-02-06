const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CLIENT = {
  'notes': './client/script/notes.ts'
};

const pages = Object.keys(CLIENT).map(chunk => new HtmlWebpackPlugin({
  template: './client/pages/template.html',
  filename: `${chunk}.html`,
  chunks: ['base', chunk]
}));

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
  },
  plugins: [
    ...(options.mode === 'development' ? [
      new NodemonPlugin({
        script: path.resolve(__dirname, 'dist', 'server.bundle.js'),
        watch: path.resolve(__dirname, 'dist'),
      }),
    ] : []),
  ]
});

const clientConfig = {
  context: path.resolve(__dirname, 'src'),
  target: 'web',
  entry: {
    'base': './client/index.ts',
    ...CLIENT,
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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    ...pages,
    new CleanWebpackPlugin({
    }),
  ],
}

module.exports = [serverConfig, clientConfig];
