const webpack = require('webpack');
const path = require('path');
const { ConsolePlugin } = require('./plugins/console');
const InjectPlugin = require('./plugins/inject');
const HandsomePlugin = require('./plugins/handsome');

module.exports = {
  mode: 'none',
  entry: './1.webpack插件简述/main.js',
  output: {
    path: path.resolve(__dirname, 'dist1'),
  },
  plugins: [
    new webpack.CleanPlugin(),
    new ConsolePlugin(),
    new InjectPlugin(),
    new HandsomePlugin({
      name: 'gaaming',
    }),
  ],
};
