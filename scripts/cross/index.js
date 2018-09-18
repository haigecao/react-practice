const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');
const babel = require('babel-core');

const sourceFolder = path.resolve(__dirname, '../..', 'public/cdn');
const files = fs.readdirSync(sourceFolder);
let eleString;
let str;

files.forEach((f) => {
  if (/\.html$/.test(f)) {
    const sourseF = path.resolve(sourceFolder, f);

    eleString = parse5.parse(fs.readFileSync(sourseF, 'utf-8'));

    eleString.childNodes[1].childNodes.map((items) => {
      if (items.nodeName === 'body') {
        items.childNodes.map((node) => {
          if (node.nodeName === 'script' && node.attrs.length === 0) {
            if (node.childNodes.length > 0) {
              node.childNodes[0].value = babel.transform(node.childNodes[0].value, {
                presets: ['es2015', 'stage-2', 'react'],
                plugins: ['transform-remove-strict-mode'],
              }).code;
            }
          } else if (node.nodeName === 'script') {
            node.attrs.push({ name: 'crossorigin', value: 'anonymous' });
          }
        });
      }
    });

    str = parse5.serialize(eleString);

    fs.writeFileSync(sourseF, str, 'utf-8');
  }
});

