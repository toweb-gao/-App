// pages/mymap/mymap.js
Page({
  data: {
     longitude:0,   //经度
     latitude:0     //纬度
  },
  onLoad: function (options) {
     //获取当前用户位置信息
     wx.getLocation({
       type:"wgs84",     //定位方式
       success: (res)=> {//定位成功
         //保存当前位置
         this.setData({longitude:res.longitude});
         this.setData({latitude:res.latitude});
       },
     })
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