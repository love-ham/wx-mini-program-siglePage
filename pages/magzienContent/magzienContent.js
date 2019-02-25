// pages/magzienContent/magzienContent.js
var request = require("../extra/js/request.js")
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
    console.log(this.data)
     var id = res.currentTarget.dataset.articlelike;
     this.data.listLike[id] = !this.data.listLike[id];
     this.setData({
       listLike:this.data.listLike
     });
     wx.setStorageSync("listLike",this.data.listLike);
  },
  jumpToArticleContent:function(res){
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url:"/pages/articleContent/articleContent?id="+id
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.typeId || 1;
    this.getPageContent(id);
    this.initListLike();
  },
  getPageContent:function(id){
    var self = this;
    
    request({
      url:"/getArticleTypeTitleInfo/"+id,
      success:function(res){
        self.setData({
          titleData:res.data.data
        })
     }
    });
    request({
      url:"/getArticleTypeList/"+id,
      success:function(res){
        console.log(res)
        self.setData({
          articleList:res.data.data
        })
      }
    })
  },
  initListLike:function(){
    var stroage = wx.getStorageSync("listLike");
    if(stroage){
      this.setData({
        listLike:stroage
      })   
    }else{
      wx.setStorageSync("listLike",this.data.listLike);
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