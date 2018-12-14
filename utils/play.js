export default {
  onMusicTap: function (e) {
    //播放背景音乐
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
    this.setData({ songname: this.data.darinPeerless[i].mname })
    if (e.currentTarget.dataset.mname == undefined) {
      this.setData({
        mname: this.data.songname
      })
    }
    var dataUrl = this.data.darinPeerless[i].murl
    var title = this.data.darinPeerless[i].mname
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
      wx.pauseBackgroundAudio({})
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
  },
}