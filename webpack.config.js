var webpack = require('webpack');
var path = require('path');
module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  entry: {
    'app': './src/main.ts',
    'vendor': './src/vendor.ts',
  },
  output: {
    path: './dist',
    filename: "bundle.js",
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],
  devServer: {
    inline: true,
    contentBase: './dist',
    historyApiFallback: true,
    port: 4444
  },
  devTool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'raw-loader'
      }
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
  }
};
