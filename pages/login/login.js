// pages/login/login.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  uname:"",
  upwd:null,
  islogin:true,
  },



//自定义功能
//微信登录
  wxlogin:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
//登录
  login:function(e){
  // this.setData({
    var uname = e.detail.value.uname
    var upwd =e.detail.value.upwd
  // })
  if(this.data.uname.trim()==""&&this.data.upwd.trim()==""){
    wx.showToast({
      title: '用户名或密码不能为空',
      icon:"none",
      duration:1500,
    })
    return
  }
    wx.request({
      url:"http://localhost:3000/mlogin/login",
      data:{
        uname:"tom",
        upwd:"123456",
      },
      withCredentials: true,
      header: app.globalData.header,
      method:"POST",
      dataType:"json",
      responseType: 'text',
      success:(res)=>{
        console.log(res.data)

        wx.setStorageSync('JSESSIONID', res.data.sessionId) //如果本地没有就说明第一次请求 把返回的session id 存入本地
        var sessionId = wx.getStorageSync('JSESSIONID');
        console.log(sessionId)
        app.globalData.sessionId = sessionId;
        if(res.data.code==1){
          this.setData({
            islogin:false
          })
          wx.showToast({
            title: "登陆成功",
            icon: "none",
            duration: 1500
          })
          wx.switchTab({
            url: '../my-music/my-music',
          })
        }else{
          wx.showToast({
            title:"用户名或密码错误",
            icon: "none",
            duration: 1500            
          })
          this.setData({
            islogin: true
          })
        }
      }
    })
  },
  getuserinfo(){
    var uname = app.globalData.userInfo.nickName;
    wx.setStorageSync('uname', uname)
    if(uname != "")
    this.setData({
      uname:uname,
      islogin:false
    })
    wx.showToast({
      title: '登录成功',
      icon:"none",
      duration:2000
    })
    console.log(uname)
  },
  islogin:function(){
    wx.request({
      url: 'http://localhost:3000/mlogin/islogin',
      header:app.globalData.header,
      success: (res) => {
        var ok = res.data.ok;
        console.log(res.data)
        var sessionId = wx.getStorageSync('JSESSIONID');
        if (sessionId == "" || sessionId == null) {
            wx.setStorageSync('JSESSIONID', res.data.sessionId) //如果本地没有就说明第一次请求 把返回的session id 存入本地
            console.log(sessionId)
            app.globalData.sessionId = sessionId;
            app.globalData.header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + sessionId }
          } else {
            app.globalData.header = { 'content-type': 'application/x-www-form-urlencoded' }
          }
          console.log(sessionId)
          console.log(res.data.uname)
          if(ok==1){
            this.setData({
              uname: res.data.uname,
              islogin: false
            })
          }else{
            this.setData({
              islogin: true
            })
          }
      },
    })
  },

//注册跳转
regBtn:function(){
  console.log(123)
  wx.navigateTo({
    url: '../register/register',
  })
},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.islogin()
    this.getuserinfo()
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