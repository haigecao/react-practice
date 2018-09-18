/* eslint-disable import/no-extraneous-dependencies */
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack/config');
var entry = config.entry;
var resolve = config.resolve;
var getAutoWebPlugin = config.getAutoWebPlugin;
var getCommonsChunkPlugin = config.getCommonsChunkPlugin;

module.exports = {
	entry: entry,
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dev'),
		filename: '[name].js',
	},
	resolve: Object.assign({}, resolve, {
		symlinks: true,
	}),
	module: {
		// 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
		noParse: /node_modules\/(moment|chart\.js)/,
		rules: [
			{
				test: /\.jsx?$/,
				// cacheDirectory 缓存babel编译结果加快重新编译速度
				loader: ['babel-loader?cacheDirectory' /* , 'eslint-loader' */],
				// 只命中src目录里的js文件，加快webpack搜索速度
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.js$/,
				// 加载 imui 里的 // @require '.css'
				loaders: ['comment-require-loader'],
				// include: [path.resolve(__dirname, 'node_modules/imui')],
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader?removeSVGTagAttrs=false&classPrefix',
				include: [path.resolve(__dirname, 'src')],
			},
			{
				test: /\.(gif|png|jpe?g|eot|woff|ttf|pdf)$/,
				loader: 'file-loader?name=[name].[ext]',
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				// 'NODE_ENV': JSON.stringify('development')
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		getAutoWebPlugin({
			ROOT_PATH: '/dev/',
		}),
		getCommonsChunkPlugin(),
	],
	devtool: 'cheap-eval-source-map',
	devServer: {
		host: '127.0.0.1',
		port: 7788,
		hotOnly: true,
	},
};
