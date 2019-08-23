const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const sourcePath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, './build')
const jsSourcePath = path.join(__dirname, './src/js')

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.HotModuleReplacementPlugin()
]

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './js/index.js',
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: buildPath
  },
  resolve: {
    extensions: [
     '.js',
     '.jsx'
   ],
   modules:[
     path.resolve(__dirname, 'node_modules'),
     jsSourcePath
   ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: "development",
  devtool: "source-map",
  watch: true,
  plugins,
  devServer : {
    contentBase: sourcePath,
    compress: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true,
    port: 3000,
    host: '127.0.0.1',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  }
};
