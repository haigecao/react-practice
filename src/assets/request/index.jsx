import fetch from 'isomorphic-fetch';
// require('es6-promise').polyfill();
// require('isomorphic-fetch');
// function request() {}
// const mids = {
// 	cgi_http_timeout: 1, //  http 请求10s超时
// 	cgi_http_status_error: 2, //  http 请求10s超时
// 	cgi_params_error: 3, // 100001：参错错误，出现这种情况很可能是页面参数传错了， 需要前端同学紧急处理（除了人肉构造参数的情况）
// 	cgi_server_error: 4, //  100003：服务错误，服务器挂了，需要后台同学紧急处理
// 	cgi_server_timeout: 5, // 100012：服务超时错误，服务器过载了，需要后台同学紧急处理
// 	cgi_other_error: 6, // 其他错误
// 	cgi_succ: 7, // 接口调用成功
// };
// request.init({ mids });

const request = fetch;
module.exports = request;
