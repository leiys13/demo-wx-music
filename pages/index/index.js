Page({
  data: {
    item: 0,
    tab: 0
  },

  onReady: function() {
    var audio = wx.createInnerAudioContext()
    audio.src = '/music/酸酸甜甜就是我.mp3'
    audio.onPlay(function() {
      console.log('开始播放 酸酸甜甜就是我-张含韵 ... http')
    })
    audio.onError(function(res) {
      console.log('errMsg: ', res.errMsg)
      console.log('errCode: ', res.errCode)
    })
    audio.play()
  },

  /**
   * 事件类函数
   */
  changeItem: function(e) {
    this.setData({item: e.target.dataset.item})
  },
  changeTab: function(e) {
    this.setData({tab: e.detail.current})
  },

  scroll: function(e) {
    console.log(e.detail)
  }
})
