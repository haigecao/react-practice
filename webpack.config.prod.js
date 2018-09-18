// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack/config');
var entry = config.entry;
var resolve = config.resolve;
var getAutoWebPlugin = config.getAutoWebPlugin;
var getCommonsChunkPlugin = config.getCommonsChunkPlugin;

var ASSETS = {
  js: '',
  css: '',
  img: '',
};

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: ASSETS.js,
    filename: '[name]_[chunkhash].js',
  },
  resolve: Object.assign({}, resolve, {
    alias: Object.assign({}, resolve.alias, {
      'redux-logger': path.resolve(__dirname, './src/assets/redux-logger-fake'),
    }),
  }),
  module: {
    // 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
    noParse: /node_modules\/(moment|chart\.js)/,
    rules: [
      {
        test: /\.jsx?$/,
        // cacheDirectory 缓存babel编译结果加快重新编译速度
        loader: 'babel-loader?cacheDirectory',
        // 只命中src目录里的js文件，加快webpack搜索速度
        // include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/@tencent')],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        // 加载 imui 里的 @require '.css'
        loaders: ['comment-require-loader'],
        include: [path.resolve(__dirname, 'node_modules/imui')],
      },
      {
        test: /\.scss$/,
        // 提取出css
        loaders: ExtractTextPlugin.extract({
          // 通过css加载的文件都放在9.url.cn
          publicPath: ASSETS.img,
          fallback: 'style-loader',
          // 压缩css
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
        }),
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        // 提取出css
        loaders: ExtractTextPlugin.extract({
          // 通过css加载的文件都放在9.url.cn
          publicPath: ASSETS.img,
          fallback: 'style-loader',
          // 压缩css
          use: ['css-loader?minimize'],
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?removeSVGTagAttrs=false&classPrefix',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
        loader: 'file-loader?name=[name]_[hash].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
    }),
    new ExtractTextPlugin({
      filename: '[name]_[contenthash].css',
      allChunks: true,
    }),
    getAutoWebPlugin({
      ROOT_PATH: '/',
    }),
    getCommonsChunkPlugin(),
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
  devtool: 'hidden-source-map',
};
