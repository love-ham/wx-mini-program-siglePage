// pages/articleContent/articleContent.js
var lib = require("../extra/js/ku.js");
var request = require("../extra/js/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isHidden:true,
      isPlay:true,
      currentTime:0,
      width:506,
      left:"0rpx",
      temLeft:0,
      precent:"0",
      isDrg:false
  },
  playVideo:function(){
    this.setData({
      isHidden:false
    })
    var videoContext = wx.createVideoContext("videoId");
    videoContext.play();
  },
  onStauteChange:function(){
    if(this.data.isPlay){
      this.backgroundAudioManager.pause();
    }else{
      this.backgroundAudioManager.play();
    }
    this.setData({
      isPlay:!this.data.isPlay
    })

  },
  onSpanButtonMove:function(e){
    var left = this.data.temLeft + (e.touches[0].clientX - this.data.onSpanButtonStart)*lib.getPageScale();
    left = left < 0 ? 0 : left;
    left = left > this.data.width ? this.data.width : left;
    var precent = Math.floor((left/this.data.width)*100);
    this.setData({
      left:left+"rpx",
      precent:precent});
  },
  onSpanButtonStart:function(e){
    this.data.isDrg = true;
    this.setData({
      onSpanButtonStart:e.touches[0].clientX,
      temLeft:parseInt(this.data.left)
    });
   },
   onSpanButtonEnd:function(e){
    this.data.isDrg = false;
    var checkedTime = (this.data.precent / 100 )*this.data.articleContent.audio.duration;
    this.backgroundAudioManager.seek(checkedTime);
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var id = options.id || 11;
   this.setData({itemId:id});
   this.getPageContent(id);
  },
  getPageContent:function(id){
  var self = this;
    request({
      url:"/getArticleDetail/"+id,
      success:function(res){
        self.setData({
           articleContent:res.data.data
        })
        if(id == 11){
        self.backgroundAudioManager = wx.getBackgroundAudioManager();
        self.audioControl(self.backgroundAudioManager);
        }
      }
    })
  },
  audioControl:function(audioManager){
    var self = this;
    audioManager.src = this.data.articleContent.audio.src;
    audioManager.title = this.data.articleContent.audio.title;
    audioManager.onEnded(function(){self.setData({isPlay:false})});
    audioManager.onTimeUpdate(function(){
      self.setData({currentTime:audioManager.currentTime});
      if(!self.data.isDrg){
            self.setData({
              left:self.compute(audioManager.currentTime,self.data.articleContent.audio.duration,self.data.width),
              precent:self.compute(audioManager.currentTime,self.data.articleContent.audio.duration)
            });
          }
      
  })
  },
  compute:function compute(currentTime,duration,width){
    var precent = (currentTime / duration);
    if(width){
        return precent*width+"rpx";
    }else{
        return Math.floor(precent*100);
    }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})