/* eslint-disable*/ 
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const sourceFolder = path.resolve(__dirname, '../..', 'public/cdn');
const files = fs.readdirSync(sourceFolder);
let lintFlag = true; // 先设置false测试

files.forEach((f) => {
  if (/\.js$/.test(f)) {
    const sourseF = path.resolve(sourceFolder, f);
    exec(`node -c ${sourseF}`, (err, data) => {
      if (err) {
        console.log('distlint 报错', err, data);
        throw new Error("distlint 报错");
        return false;
      }
    });
  }
});
