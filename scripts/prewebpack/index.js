const path = require('path');
const fs = require('fs');
const UglifyJS = require('uglify-js');
const chalk = require('chalk');
const crypto = require('crypto');
const targetFolder = path.resolve(__dirname, '../..', 'src');

// const files = [
//   path.resolve(targetFolder, 'assets', 'qqapi.custom.uncompressed.js')
// ];

const files = [];
files.forEach(f => {
	const fileMD5 = md5(fs.readFileSync(f).toString());
	const targetFileName = f.replace(/\.js$/, `.min_${fileMD5}.js`).replace('.uncompressed.', '.');
	const result = UglifyJS.minify(
		{
			targetFileName: fs.readFileSync(f).toString(),
		},
		{
			output: {
				beautify: false,
				comments: false,
			},
		}
	);
	if (result.error) {
		console.error(chalk.red(`${f} minified error.`));
		throw result.error;
	} else {
		fs.writeFileSync(targetFileName, result.code);
		console.log(chalk.green(`${f} minified success.`));
	}
});

function md5(text) {
	return crypto
		.createHash('md5')
		.update(text)
		.digest('hex');
}
