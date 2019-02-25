// pages/magzien/magzien.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listLike:[true,false,false,false,true,true,false,false]
  },
 contentMenu:function(res){
   var content = res.currentTarget.dataset.articletype;
   wx.showActionSheet({
     itemList:["内容过时了","内容与"+content+"无关","不再推荐"+content+"的内容"],
     success:function(res){
       console.log(res.tapIndex);
     }
   })
 },
 likeChange:function(res){
   var id = res.currentTarget.dataset.articlelike;
   
   this.data.listLike[id] = !this.data.listLike[id];
  this.setData({
    listLike:this.data.listLike
  });
  wx.setStorageSync("listLike",this.data.listLike);
 },
 onArticleContent:function(res){
    var typeId = res.currentTarget.dataset.typeid;
    var jumpURL = "/pages/magzienContent/magzienContent?typeId="+typeId;
    wx.navigateTo({
      url:jumpURL
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHOmeData();
    this.likeStroage();
  },
 getHOmeData:function(){
  var self = this;
  wx.request({
    url:"https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home",
   
    success:function(res){
      self.setData({
        recommend:res.data.recommend,
        markType:res.data.markType,
        articleList:res.data.articleList
      })
    },
    fail:function(){
      console.log(111)
      wx.showToast({
        title:"请求失败，请检查网络",
        icon:"none"
      })
    }
  }) 
 },
 likeStroage:function(){
    var stroage = wx.getStorageSync("listLike");
     if(!stroage){
      wx.setStorageSync("listLike",this.data.listLike);
    }else{
      this.setData({
        listLike:stroage
      })
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