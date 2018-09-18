/* eslint-disable import/no-extraneous-dependencies */
var fs = require('fs');
var path = require('path');
var AutoWebPlugin = require('web-webpack-plugin').AutoWebPlugin;
var nunjucks = require('nunjucks');
var webpack = require('webpack');

nunjucks.configure({ noCache: true });

const ignorePages = ['action_creators', 'action_types', 'reducers'];

const getPageEntris = function() {
	return fs
		.readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
		.filter(function(item) {
			return !ignorePages.includes(item);
		})
		.reduce(function(target, next) {
			if (next === '.DS_Store') {
				return '';
			}
			let fpath = `./src/pages/${next}/index.js`;
			if (!fs.existsSync(fpath)) {
				fpath = `${fpath}x`; // jsx
			}
			if (!fs.existsSync(fpath)) {
				throw new Error(`No page entry file for ${path.dirname(fpath)}.`);
			}
			target[next] = fpath;
			return target;
		}, {});
};

exports.entry = Object.assign(
	{
		vendor: path.resolve(__dirname, '../src/assets/vendor/index'),
		polyfill: path.resolve(__dirname, '../src/assets/polyfill'),
	},
	getPageEntris()
);

exports.getAutoWebPlugin = function(config) {
	return new AutoWebPlugin(path.resolve(__dirname, '../src/pages/'), {
		template: function(pageName) {
			let templatePath = path.resolve(__dirname, '../src/pages/', pageName, 'index.html');
			if (!fs.existsSync(templatePath)) {
				templatePath = path.resolve(__dirname, '../src/assets/template.html');
			}
			return templatePath;
		},
		templateCompiler: function(pageName, templateFullPath) {
			const options = { preloadInit: false };
			const preloadInitPath = path.resolve(__dirname, '../src/pages', pageName, 'preload-init.js');
			if (fs.existsSync(preloadInitPath)) {
				options.preloadInit = true;
			}
			if (config.ROOT_PATH) {
				options.ROOT_PATH = config.ROOT_PATH;
			}
			options.pageName = pageName;
			return nunjucks.render(templateFullPath, options);
		},
		ignorePages,
		htmlMinify: false,
	});
};

exports.resolve = {
	// 加快搜索速度
	modules: [path.resolve(__dirname, '..', 'src'), path.resolve(__dirname, '..', 'node_modules')],
	// es tree-shaking
	mainFields: ['browser', 'main'],
	// 加快编译速度
	alias: {
		react: 'preact-compat',
		'react-dom': 'preact-compat',
		'create-react-class': 'preact-compat/lib/create-react-class',
		'prop-types': path.resolve(__dirname, '..', 'node_modules', 'prop-types'),
	},
	extensions: ['.jsx', '.js'],
};

exports.getCommonsChunkPlugin = function() {
	return new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: 5,
	});
};
