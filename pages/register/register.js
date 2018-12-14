// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:"",
    upwd:"",
    cpwd:"",
    msg:""
  },


  reg:function(e){
    this.setData({
      uname:e.detail.value.uname,
      upwd:e.detail.value.upwd,
      cpwd:e.detail.value.cpwd,
    })
    if (this.data.uname.trim() == "" && this.data.upwd.trim() == "" && this.data.cpwd.trim() == ""){
      wx.showToast({
        title:"用户名或密码不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(this.data.upwd!==this.data.cpwd){
      wx.showToast({
        title: '请输入相同密码',
        icon:"none",
        duration:2000
      })
      return
    }else{
      wx.request({
        url: "http://localhost:3000/mlogin/register",
        data: {
          uname: this.data.uname,
          upwd: this.data.upwd,
        },
        method:"POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
        dataType:"JSON",
        success:(res)=>{
          console.log(typeof(res.data))
          console.log(res.data)
          var obj=JSON.parse(res.data)
          this.setData({
            msg:obj.msg
          })
            wx.showToast({
              title:obj.msg,
              icon:"none",
              duration:2000
            })
            wx.redirectTo({
              url: '../login/login',
            })
        }

      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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