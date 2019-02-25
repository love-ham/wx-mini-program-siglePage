//import { NONAME } from "dns";

var baseURL = "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine";
function request(param){
   wx.request({
       url:baseURL+param.url,
       success:function(res){
           if(res.data.code === 0){
               param.success(res);
           }else{
               showToast("请求失败，请检查地址");
           }
       },
       fail:function(){
           showToast("请求失败，请检查网络");
       }
   })
}
function showToast(str){
    var str = str || "请求失败！";
    wx.showToast({
        title:str,
        icon:"none"
    })
}
module.exports = request;