const fs = require('fs');
const request = require('request');
const path = require('path');
const rm = require('rimraf').sync;

const sourceFolder = path.resolve(__dirname, '../..', 'public/cdn');
const publicCdn = 'http://pub.idqqimg.com/fudao/';  // 不同的项目，改成不同的路径
// const url = 'http://pub.idqqimg.com/fudao/act1/page-three_f59ac230b265c37d480a6ab1a8ae76c0.jpg';

const files = fs.readdirSync(sourceFolder);
let sourseF, imgHash, imgHashArr, url;
files.forEach((f) => {
  if (/\.(png|jpg|jpeg|gif)$/.test(f)) {
  	sourseF = path.resolve(sourceFolder, f);
  	imgHashArr = f.match(/([0-9a-z]{32}).(png|jpg|jpeg|gif)$/);
  	if (imgHashArr && imgHashArr.length > 0) {
			imgHash = imgHashArr[1];
			url = `${publicCdn}${f}`;
  	  checkPic(url, imgHash, sourseF);
  	}
	} else if (/\.css$/.test(f)) {
		deleteFile(path.resolve(sourceFolder, f));
	}
});

function checkPic(url, imgHash, path) {
	let info = {};

	if(!url || !imgHash || !path) {
		return;
	}
	
	request({
	  method: 'POST',
	  url: 'http://10.175.118.7/interface/api/getfileinfo',
	  body: 'url=' + encodeURIComponent(url) + '&app=T_CLASS&key=bd491a26fbe18628dc0a85be40d42815',
	  headers: {
	     'Content-Type': 'application/x-www-form-urlencoded'
	  }
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	      try {
	        info = JSON.parse(body);
	      } catch (e) {
	        info = {
	          rst: -1
	        };
				}
				
				const {
					rst,
					rdatas: {
						Md5Sum = ''
					} = {}
				} = info;

	      if (rst === 0 && Md5Sum.indexOf(imgHash) === 0) {
	      	console.log('请求cdn图片信息成功');
	      	deleteFile(path);
	      }
	    }
	  }
	);
}

function deleteFile(path) {
  try {
    rm(path);
  } catch (e) {
  	console.log('重复图片删除失败');
    return;
  }
}