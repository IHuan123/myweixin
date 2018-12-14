var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    darinPeerless: [],
    tid: 0,
    isPlayingMusic: false,
    playIcon: "http://localhost:3000/image/icon-play.png",
    index: 0,
    songname: "",
    mname: "",
    pshow: false,
    status: 2,
    i: 0,
    dataUrl:"",
    author:"",
  },
  //添加歌曲
  addmusic:function(e){
    var i = e.currentTarget.dataset.index;
    var musiclist=this.data.darinPeerless
    var tid=this.data.tid
    var uname = app.globalData.userInfo.nickName
    var mname=musiclist[i].mname
    var murl=musiclist[i].murl
    var author=musiclist[i].author
    wx.request({
      url: 'http://localhost:3000/music/addmusic',
      data:{tid,uname,mname,murl,author},
      method:"GET",
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success:(res)=>{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration:2000
          })
      }
    })
  },

  getmuisclist: function (n) {
    wx.request({
      url: 'http://localhost:3000/music/getmusic',
      data: {
        tid: this.data.tid
      },
      method: "get",
      success: (res) => {
        console.log(res.data)
        this.setData({
          darinPeerless: res.data
        })
      }
    })
  },
  onMusicTap: function (e) {

    //播放所需条件
        var isplay=app.globalData.status
        //播放背景音乐
        var i = e.currentTarget.dataset.index;//获取点击歌曲的下标
        console.log(this.data.mname)
        console.log(this.data.songname)

        if (i == undefined) {//下标在不同情况下的取值
          i = wx.getStorageSync("index")
          console.log(i)
          this.setData({
            songname: this.data.darinPeerless[i].mname
          })
        }else{
          this.setData({
            index: i,
            songname: this.data.darinPeerless[i].mname
          })

          wx.setStorageSync("songname", this.data.darinPeerless[i].mname)
          wx.setStorageSync("index", i)
          var i = e.currentTarget.dataset.index;
          this.setData({
            i: i
          })
        }
        if (e.currentTarget.dataset.mname == undefined) {
          this.setData({
            mname: this.data.songname
          })
        }

        
        wx.setStorageSync("dataUrl", this.data.darinPeerless[i].murl)
        var dataUrl = this.data.darinPeerless[i].murl
        this.setData({
          dataUrl:dataUrl,
          author: this.data.darinPeerless[i].author
        })
        app.globalData.musicUrl=dataUrl
        var title = this.data.darinPeerless[i].mname
        app.globalData.etitle=title;
        var isp = this.data.isPlayingMusic;


        if (isp == false) {
          this.setData({
            playIcon: "http://localhost:3000/image/icon-pause.png"
          })
          wx.playBackgroundAudio({//播放
            dataUrl,
            title,
          })
          this.setData({ isPlayingMusic: true })
        } else if (isp == true) {
          this.setData({
            playIcon: "http://localhost:3000/image/icon-play.png"
          })
          wx.pauseBackgroundAudio({})//暂停
          wx.setStorageSync("status", 2)
          isp = false;
          this.setData({ isPlayingMusic: false })
          if (this.data.mname != this.data.songname) {
            this.setData({
              playIcon: "http://localhost:3000/image/icon-pause.png"
            })
            wx.playBackgroundAudio({
              dataUrl,
              title,
            })
            this.setData({ isPlayingMusic: true })
            wx.setStorageSync("status", 1)
          };
        }



        if (e.currentTarget.dataset.mname != undefined) {
          this.setData({ mname: e.currentTarget.dataset.mname })
        } else {
          this.setData({ mname: this.data.songname })
        }
  },
  
//监听播放状态
  playState: function () {
    this.setData({
      songname:wx.getStorageSync("songname")
    })
    wx.getBackgroundAudioPlayerState({
      success: (res) => {
        var status = res.status
        app.globalData.status = res.status
      }
    })
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png"
      })
      this.setData({ isPlayingMusic: true })
      wx.setStorageSync("status", 2)
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png"
      })
      this.setData({ isPlayingMusic: false })
      wx.setStorageSync("status", 1)
    })

    var status = wx.getStorageSync("status")
    if (status == 2) {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false
      })
      wx.setStorageSync("status", 1)
    } else if (status == 1) {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-pause.png",
        isPlayingMusic: true
      })
      wx.setStorageSync("status", 2)
    }
    wx.onBackgroundAudioStop(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false,
      })
      wx.setStorageSync("status", 1)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tid)
    var tid = JSON.parse(options.tid)
    this.setData({
      tid: tid
    })
    this.getmuisclist()
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
    this.playState()
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