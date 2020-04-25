// 云函数入口文件
//web1910detail 26885074
const cloud = require('wx-server-sdk')
cloud.init()
//1:引入模块 request-promise
var rp = require("request-promise");
// 云函数入口函数
exports.main = async (event, context) => {
//2:创建变量 url
  var url =`
http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
//3:发送请求
 return rp(url)
 .then(res=>{return res})
 .catch(err=>{console.log(err)})
 
}