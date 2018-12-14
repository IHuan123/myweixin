// pages/explore/explore.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  lList:[],
  placelist:[],
  playIcon: "http://localhost:3000/image/icon-play.png",
  status: app.globalData.status,
  songname: "",
  },
  //获取头部图片
  gettopimg(){
    wx.request({
      url: 'http://localhost:3000/music/explore',
      method:"GET",
      success:(res)=>{
        console.log(res.data)
        this.setData({
          lList:res.data
        })
      }
    })
  },
  getplace:function(){//获取地区分类
    wx.request({
      url:"http://localhost:3000/music/placelist",
      method:"GET",
      success:(res)=>{
        console.log(res.data)
        this.setData({
          placelist:res.data
        })
      }
    })
  },
  //获取歌曲列表
  getdarinpeerless: function (e) {
    var tid = e.currentTarget.dataset.type;
    console.log(tid)
    wx.navigateTo({
      url: "../muisc-list/muisc-list?tid=" + tid
    })
  },
  onMusicTap: function () {
    var status = wx.getStorageSync("status")
    if (status == 2) {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: true
      })
      wx.setStorageSync("status", 1)
    } else if (status == 1) {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png",
        isPlayingMusic: false
      })
      wx.setStorageSync("status", 2)
    }
    var play = wx.getBackgroundAudioManager()
    var isp = this.data.isPlayingMusic;
    if (!isp) {
      play.play()
      this.setData({
        isPlayingMusic: true
      })
    } else {
      play.pause()
      this.setData({
        isPlayingMusic: false
      })
    }
    //监听播放状态
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false
      })
    })
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png",
        isPlayingMusic: true
      })
    })

    wx.getBackgroundAudioPlayerState({
      success: (res) => {
        var status = res.status
        app.globalData.status = res.status
        this.setData({
          status: res.status
        })
      }
    })
  },
  playState: function () {
    //监听播放状态
     var status = wx.getStorageSync("status")
     if (status == 2) {
       this.setData({
         playIcon: "http://localhost:3000/image/icon-play.png",
         isPlayingMusic: true
       })
       wx.setStorageSync("status", 1)
     } else if (status == 1) {
       this.setData({
         playIcon: "http://localhost:3000/image/icon-pause.png",
         isPlayingMusic: false
       })
       wx.setStorageSync("status", 2)
     }


    var status = wx.getStorageSync("status")
    if (status == 2) {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: true
      })
      wx.setStorageSync("status", 1)
    } else if (status == 1) {

      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png",
        isPlayingMusic: false
      })
      wx.setStorageSync("status", 2)
    }
    // console.log(status)
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png",
        isPlayingMusic: true
      })
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false
      })
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false,
      })
      wx.setStorageSync("status", 1)
    })
  },

  songname: function () {
    this.setData({
      songname: wx.getStorageSync("songname")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettopimg()
    this.getplace()
    this.playState()
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
    // this.getsonglist()
    // this.getalbum()
    this.playState()
    // this.onMusicTap() 
    this.songname()   
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