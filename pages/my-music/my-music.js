// pages/my-music/my-music.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    playIcon: "http://localhost:3000/image/icon-play.png",
    index: 0,
    songname: "",
    mname: "",
    mymusiclist:[],
    uname:"",
    dataUrl: "",
    author: "",
    bname:"",
    burl:"",
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  getmymusic:function(){
    if (app.globalData.userInfo!=null){
      var uname = this.data.uname
      console.log(uname)
      wx.request({
        url: 'http://localhost:3000/music/mymusic',
        data: { uname: uname },
        method: "GET",
        success: (res) => {
          this.setData({
            mymusiclist: res.data
          })
        }
      })
    }

  },
  getuserinfo() {
    var uname = wx.getStorageSync("uname");
    if (uname != "")
      this.setData({
        uname: uname,
      })
    console.log(uname)
  },
  //删除歌曲
  remove:function(e){
    wx.showModal({
      title: '删除',
      content: '是否删除',
      success:(res)=>{
        if(res.confirm){
          var i = e.currentTarget.dataset.index
          var music = this.data.mymusiclist[i]
          var aid = music.aid
          wx.request({
            url: 'http://localhost:3000/music/remove',
            data: { aid: aid },
            method: "GET",
            success: (res) => {
              wx.showToast({
                title: res.data.msg,
                duration: 2000
              })
              this.getmymusic()
            }
          })
        }else{
          console.log("取消删除")
        }
      }
    })
  },


  onMusicTap: function (e) {
    //监听播放状态
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
    //播放所需条件
    var list=this.data.mymusiclist
    if(list.length>0){
      var isp = this.data.isPlayingMusic//播放状态
      var i = e.currentTarget.dataset.index
      if(i==undefined){
        i=0
      }else{
        i = e.currentTarget.dataset.index
      }
      
      var songname = this.data.mymusiclist[i].mname//当前点击的歌曲名称
      var murl = this.data.mymusiclist[i].murl
      var mname = this.data.mname
      this.setData({
        bname:songname,
        burl:murl
      })
      if (isp == false&&songname!=mname) {
        wx.playBackgroundAudio({
          dataUrl: murl,
          title: songname,
          success: () => {
            this.setData({
              playIcon: "http://localhost:3000/image/icon-pause.png",
              isPlayingMusic: true,
              songname: songname,
            })
            console.log("播放第一次")
          }
        })
      } else if (isp == true&&songname==mname) {
        wx.pauseBackgroundAudio({
          success: () => {
            this.setData({
              playIcon: "http://localhost:3000/image/icon-play.png",
              isPlayingMusic: false,
              songname: songname,
            })
            console.log("点击正在播放的音乐")
          }
        })
      }else if(isp==true&&songname!=mname){
        wx.playBackgroundAudio({
          dataUrl: murl,
          title: songname,
          success: () => {
            this.setData({
              playIcon: "http://localhost:3000/image/icon-pause.png",
              isPlayingMusic: true,
              songname: songname,
            })
            console.log("播放另外的音乐")
          }
        })        
      }else if(isp==false&&songname==mname){
        wx.playBackgroundAudio({
          dataUrl: murl,
          title: songname,
          success: () => {
            this.setData({
              playIcon: "http://localhost:3000/image/icon-pause.png",
              isPlayingMusic: true,
              songname: songname,
            })
            console.log("播放另外的音乐")
          }
        })          
      }
      wx.onBackgroundAudioStop(() => {//播放下一首
          this.setData({
            playIcon:"http://localhost:3000/image/icon-play.png",
            isPlayingMusic: false,
          songname:songname,
        })
      })
      this.setData({
        mname: songname
      })
    }
  },
  playButton:function(){
    var songname=this.data.mname;
    var dataUrl=this.data.murl;
    var isp=this.data.isPlayingMusic
    if(isp==false){
      wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title:songname,
        success:()=>{
          this.setData({
            palyIcon: "http://localhost:3000/image/icon-pause.png",
            isPlayingMusic:true
          })
        }
      })
    }else if(isp==true){
      wx.pauseBackgroundAudio({
        dataUrl: dataUrl,
        title: songname,
        success: () => {
          this.setData({
            palyIcon: "http://localhost:3000/image/icon-play.png",
            isPlayingMusic: false
          })
        }
      })      
    }
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
  },
  //监听播放状态
  playState: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserinfo()
    this.getmymusic()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getuserinfo()
    this.getmymusic()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmymusic()
    this.getuserinfo()
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