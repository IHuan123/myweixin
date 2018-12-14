// pages/search/search.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist:[],
    isPlayingMusic: false,
    playIcon: "http://localhost:3000/image/icon-play.png",
    index: null,
    a: null,
    b: null,
    songname: "音乐",
    mname: "",
    searchcontent:"",
  },
  //添加歌曲
  addmusic: function (e) {
    var i=e.currentTarget.dataset.index
    var musiclist=this.data.musiclist
    var tid = musiclist[i]
    var uname = app.globalData.userInfo.nickName
    var mname = musiclist[i].mname
    var murl = musiclist.murl
    var author = musiclist.author
    wx.request({
      url: 'http://localhost:3000/music/addmusic',
      data: { tid, uname, mname, murl, author },
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
      }
    })
  },
  //搜索
  search:function(e){
    var searchcontent=e.detail.value.mname.trim()
    this.setData({
      searchcontent: searchcontent
    })
    console.log(searchcontent)
    wx.request({
      url: 'http://localhost:3000/mlogin/search',
      data: { mname:searchcontent},
      method:"GET",
      success:(res)=>{
        console.log(res.data)
        if(res.data.length>0){
          this.setData({
            musiclist: res.data
          })
        }else{
          wx.showToast({
            title: '没有找到相关歌曲',
            icon:"none",
            duration:2000,
          })
        }
      }
    })
  },
  //播放
  onMusicTap: function (e) {
    //播放背景音乐
    if(this.data.musiclist.length>0){
      var i = e.currentTarget.dataset.index;

      console.log(this.data.mname)
      console.log(this.data.songname)

      if (i == undefined) {
        i = this.data.index
      } else {
        this.setData({
          index: i
        })
      }
      this.setData({ songname: this.data.musiclist[i].mname })
      if (e.currentTarget.dataset.mname == undefined) {
        this.setData({
          mname: this.data.songname
        })
      }
      var dataUrl = this.data.musiclist[i].murl
      var title = this.data.musiclist[i].mname
      var isp = this.data.isPlayingMusic;


      if (isp == false) {
        this.setData({
          playIcon: "http://localhost:3000/image/icon-pause.png"
        })
        wx.playBackgroundAudio({
          dataUrl,
          title,
        })
        this.setData({ isPlayingMusic: true })


      } else if (isp == true) {

        this.setData({
          playIcon: "http://localhost:3000/image/icon-play.png"
        })
        wx.pauseBackgroundAudio()
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
        };
      }
      if (e.currentTarget.dataset.mname != undefined) {
        this.setData({ mname: e.currentTarget.dataset.mname })
      } else {
        this.setData({ mname: this.data.songname })
      }
    }
    wx.onBackgroundAudioStop(() => {
      this.setData({
        playIcon: "http://localhost:3000/image/icon-play.png",
        isPlayingMusic: false,
      })
    })
  },
  stop(){
    wx.stopBackgroundAudio()
    this.setData({
      playIcon: "http://localhost:3000/image/icon-play.png",
      songname:"音乐"
    })
    this.setData({ isPlayingMusic: false })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      songname:"音乐"
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
    this.setData({
      musiclist:[],
      searchcontent:""
    })
    this.stop()
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