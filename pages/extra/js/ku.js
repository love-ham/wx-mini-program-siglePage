var lib = {
    getPageScale:function(){
        var scale = 0 ;
        wx.getSystemInfo({
            success:function(res){
             scale = 750 / res.screenWidth;
            }
        })
        return scale;
    }
}
module.exports = lib;