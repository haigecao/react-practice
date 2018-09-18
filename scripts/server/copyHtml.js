const path = require('path');
const fs = require('fs');

const sourceFolder = path.resolve(__dirname, '../..', 'public/cdn');
const targetFolder = path.resolve(__dirname, '../..', 'app/views');
const files = fs.readdirSync(sourceFolder);
const whiteList = ['course.html', 'teacher.html', 'qq_learning.html', 'course_break_article.html', 'qq_question.html'];

if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
}

files.forEach((f) => {
  if (whiteList.indexOf(f) !== -1) {
    const sourseF = path.resolve(sourceFolder, f);
    const targetF = path.resolve(targetFolder, f)
    const data = deleteLoading(fs.readFileSync(sourseF).toString());
    fs.writeFileSync(targetF, data);
  }
})

function deleteLoading(str) {
  var s = str.substring(str.indexOf("<!--CLIENT_ONLY_START-->"), str.lastIndexOf("<!--CLIENT_ONLY_END-->"));
  return str.replace(s, '');
}
