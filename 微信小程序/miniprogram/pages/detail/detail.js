// pages/detail/detail.js
//创建云数据库对象:连接云数据库
const db = wx.cloud.database();
Page({
  data: {
    val2:"",     //用户输入留言
    val3:3,      //用户评分
    id:0,        //电影id
    info:[],     //接收电影详细信息
    image:[],    //保存预览图片地址[临时图片路径] 
    fileIDS:[]   //保存云存储中文件地址
  },
  submit:function(){
    //功能:上传图片并且添加数据到云数据库中
    //功能一:上传图片至云存储
    //1:显示数据加载提示框[暗示用户我正在工作]
    wx.showLoading({
      title: '评论发表中...',
    });
    //2:在data中添加属性fileIDS:[] 保存图片fileID
    //3:创建数组保存Promise对象
    var rows = [];
    //4:如果用户没有选中图片不行,提示 43
    if(this.data.image.length==0){
      wx.showToast({
        title: '请选择图片...',
      });
      return;//停止函数执行
    }
    console.log(1)
    //5:创建循环遍历临时图片数组
    for(var i=0;i<this.data.image.length;i++){
     console.log(2)
     rows.push(new Promise((resolve,reject)=>{
     console.log(3); 
     //5.1:获取当前图片名称
     var item = this.data.image[i];
     console.log(item);
     //5.2:创建正则表达式 [".png","4",..]
     var suffix = /\.\w+$/.exec(item)[0];
     //5.3:创建新文件名
     var newFile = new Date().getTime();
     newFile+=Math.floor(Math.random()*9999);
     newFile+=suffix;
     console.log(4);
     console.log(newFile);
     //5.4:将当前图片上传云存储中
     wx.cloud.uploadFile({
       cloudPath:newFile,//新文件名
       filePath:item,    //临时文件名
       success:(res=>{   //上传成功
          console.log(5);
          //5.5:上传成功将图片fileID保存属性fileIDS
          this.data.fileIDS.push(res.fileID);
          //5.6:执行成功函数
          resolve();
          console.log(6);
       })
     })
     }))
    }//for end
    //功能二:将评论;留言;图片地址添加云数据库
    //*6.1:在云开发控制面板加集合web1910movie
    //*6.2:等待所有rows中Promise对象执行完毕
    Promise.all(rows).then(res=>{
      console.log(7);
      //*6.3:在钩子函数里添加数据，云数据库中
      //*6.3.1:获取评分
      var v3 = this.data.val3;
      //*6.3.2:获取留言为空  "这家伙什么也没说"
      var v2 = this.data.val2;
      if(!v2){v2="这家伙什么也没说"}
      //*6.3.3:获取所有图片fileIDS
      var fids = this.data.fileIDS;
      console.log(8);
      console.log(v3+"_"+v2+"_"+fids);
      //创建数据库对象db 连接云数据库中
      //*6.3.4:向集合中添加一条记录  
      //  留言/电影id/评分/图片id
      db.collection("web1910movie")
      .add({
        data:{
          content:v2,     //留言 content 内容
          score:v3,       //评分 score   分数
          fids:fids,      //图片fileids
          mid:this.data.id,//电影id
        }
      }).then(res=>{
        console.log(9);
        //6.3.5:隐藏加载提示框
        wx.hideLoading();
        //6.3.6:显示评论成功提示
        wx.showToast({
          title:"评论发表成功...."
        })
      })
    })
  },
  upload:function(){
    //功能:选中图片并且实现预览效果
    //1:在data添加属性image:预览图片
    //2:选中一张图片
    wx.chooseImage({
      count:9,                               //选中图片数量
      sizeType:["original","compressed"],    //选中图片类型
      sourceType:["album","camera"],        //图片来源  
      success: (res) =>{
        //console.log(res.tempFilePaths);
        //临时图片路径 res.tempFilePaths
        this.setData({ image:res.tempFilePaths})
      },
    })
    //3:预览图片
  },
  onLoad: function (options) {
   //获取电影id
   var id = options.id;
   this.setData({id:id})
   this.loadMore();
  },
  loadMore:function(){
    //功能:先获取电影id调用云函数web1910detail
    var id = this.data.id;
    //console.log("1:"+id)
    //1:调用云函数web1910detail
    wx.cloud.callFunction({
      name:"web1910detail",
      data:{id:id}
    }).then(res=>{
      //console.log(res.result);
      //将字符串转换js对象
      var obj = JSON.parse(res.result);
      this.setData({info:obj});
    })
    .catch(err=>{
      console.log(err)
    })
    //2:传参数id
    //3:获取云函数返回结果
    //4:在data添加属性info 保存返回结果
    //5:在onload调用此函数
  },
  onChangeVal3: function (event) {
    //功能:修改用户评分
    this.setData({ val3: event.detail })
  },
  onChangeVal2: function (even) {
    //功能:用户输入内容
    console.log("1" + even.detail);
    this.setData({ val2: even.detail })
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