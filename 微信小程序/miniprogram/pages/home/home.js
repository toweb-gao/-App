// pages/home/home.js
//热门电影列表组件
//1:组件创建成功调用云函数加载第一页数据
//  web1910page
//2:向上滑动加载下一页数据  
Page({
  data: {
     //1:添加三个属性 list 电影列表;start:开始记录数 count:一页几行
     list:[],
     start:0,
     count:5
  },
  detail:function(e){
    //1:获取自定义属性中 id   57
    var id = e.target.dataset.id;
    //2:跳转 detail组件
    var url = `/pages/detail/detail?id=${id}`;
    wx.navigateTo({
      url: url,
    })
  },
  loadMore:function(){
     //功能:加载热门电影列表
     //1:调用云函数web1910page
     //2:参数start count
     //3:接收豆瓣返回数据[查看豆瓣返回数据 格式 内容]
     wx.cloud.callFunction({
         name:"web1910page",
         data:{
           start:this.data.list.length,   //数组长度
           count:this.data.count          //5
         }
     }).then(res=>{
      //4:将数据保存list列表[查看豆瓣返回数据 格式 内容]
      ///豆瓣返回数据字符串将转js对象 
      //json type字符串->js object
      var rows = JSON.parse(res.result);
      //this.setData({list:rows.subjects})
      rows = this.data.list.concat(rows.subjects);
      this.setData({list:rows});
      //5:在loadMore调用此函数
     }).catch(err=>{console.log(err)})
  },
  onLoad: function (options) {
      this.loadMore();
  },
  onReachBottom: function () {
    this.loadMore();
  },
  onReady: function () {
  },
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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})