const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const mkdirp = require('mkdirp');

const sourceFolder = path.resolve(__dirname, '../..', 'public/cdn');
const targetFolder = path.resolve(__dirname, '../..', 'pack/fudao.qq.com');
const offpackFolder = path.resolve(__dirname, '../..', 'public/offline');
const files = fs.readdirSync(sourceFolder);
let sourseF, targetF, data;

makeDir(targetFolder).then(() => {
  files.forEach((f) => {
    if (/\.(js)$/.test(f)) {
      sourseF = path.resolve(sourceFolder, f);
      targetF = path.resolve(targetFolder, f);
      data = fs.readFileSync(sourseF).toString().replace(/[7-9].url.cn\/fudao/g, 'fudao.qq.com');
      fs.writeFileSync(targetF, data);
    } else if (/\.html$/.test(f)) {
      sourseF = path.resolve(sourceFolder, f);
      targetF = path.resolve(targetFolder, f);
      data = fs.readFileSync(sourseF).toString().replace(/[7-9].url.cn\/fudao/g, 'fudao.qq.com');
      data = data.replace(/<\/head>/, '<script>window.isPack=true;window.packVersion="' + formatDate('YYYYMMDDhhssmm', new Date()) + '";</script>$&');
      fs.writeFileSync(targetF, data);
    } else if (/\.(png|ico|gif)$/.test(f)) {
      sourseF = path.resolve(sourceFolder, f);
      targetF = path.resolve(targetFolder, f);
      if(fs.statSync(sourseF).size < 15000 || /^(champion|emptyScore)/.test(f) || /\w*_sprite_\w*\.(png|ico|gif)$/.test(f)) {
        data = fs.readFileSync(sourseF);
        fs.writeFileSync(targetF, data);
      }
    }
  })
});

makeDir(offpackFolder).then(() => {
  zipPack();
});


function zipPack() {
  const output = fs.createWriteStream(path.resolve(__dirname, '../../', 'public', 'offline', 'pack.zip'));
  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  output.on('close', function () {
    console.log('pack.zip total' + archive.pointer() + ' bytes');
  });
  archive.on('error', function (err) {
    throw err;
  });

  archive.directory(path.resolve(__dirname, '../../pack'), '');

  archive.pipe(output);
  archive.finalize();
}


function formatDate(pattern, date) {
    var formatNumber;
    if (typeof date === 'number') {
        date = new Date(date);
    }
    formatNumber = function(data, format) {
        format = format.length;
        data = data || 0;
        if (format === 1) {
            return data;
        } else {
            return String(Math.pow(10, format) + data).slice(-format);
        }
    };
    return pattern.replace(/([YMDhsm])\1*/g, function(format) {
        switch (format.charAt()) {
            case 'Y':
                return formatNumber(date.getFullYear(), format);
            case 'M':
                return formatNumber(date.getMonth() + 1, format);
            case 'D':
                return formatNumber(date.getDate(), format);
            case 'w':
                return date.getDay() + 1;
            case 'h':
                return formatNumber(date.getHours(), format);
            case 'm':
                return formatNumber(date.getMinutes(), format);
            case 's':
                return formatNumber(date.getSeconds(), format);
            default:
                return '';
        }
    });
}

function makeDir(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
