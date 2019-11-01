Page({
  data: {
    // 当前所处于对标签页面 -> 0:音乐推荐；1:播放器；2:播放列表
    item: 0,
    // 顶部标签选项选中样式标记 -> 0:音乐推荐；1:播放器；2:播放列表
    tab: 0,
    // 音乐播放列表
    playList: [{
      id: 1,
      name: '无问西东',
      singer: '王菲',
      src: 'http://tally.sadasen.com/music/wuwenxidong_wf.mp3',
      img: '/images/4.jpg'
    }, {
      id: 2,
      name: '断桥残雪',
      singer: '许嵩',
      src: 'http://tally.sadasen.com/music/duanqiaocanxue_xs.mp3',
      img: '/images/4.jpg'
    }, {
      id: 3,
      name: '齐天',
      singer: '华晨宇',
      src: 'http://tally.sadasen.com/music/qitian_hcy.mp3',
      img: '/images/4.jpg'
    }, {
      id: 4,
      name: '天仙子',
      singer: '谢雨欣',
      src: 'http://tally.sadasen.com/music/tianxianzi_xyx.mp3',
      img: '/images/4.jpg'
    }, {
      id: 5,
      name: '酸酸甜甜就是我',
      singer: '张含韵',
      src: 'http://tally.sadasen.com/music/suansuantiantianjiushiwo_zhy.mp3',
      img: '/images/4.jpg'
    }, {
      id: 6,
      name: '寂寞沙洲冷',
      singer: '周传雄',
      src: 'http://tally.sadasen.com/music/jimoshazhouleng_zcx.mp3',
      img: '/images/4.jpg'
    }],
    // 音乐播放状态
    state: 'paused',
    // 音乐播放索引
    playIndex: 0,
    // 音乐播放信息
    playInfo: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      name: '',
      singer: '',
      coverImg: '/images/4.jpg'
    }
  },

  /**
   * 非data中对数据
   */
  audio: null,

  /**
   * 生命周期函数 -- 监听页面初次渲染完成
   * 创建audio播放对象，设置播放列表对第一首歌曲播放
   */
  onReady: function() {
    this.audio = wx.createInnerAudioContext()
    var that = this
    // 播放失败
    that.audio.onError(function() {
      console.log('播放失败：', that.audio.src)
    })
    // 播放完成自动换下一曲
    that.audio.onEnded(function() {
      that.next()
    })
    // 自动更新播放进度
    that.audio.onPlay(function() {})
    that.audio.onTimeUpdate(function() {
      that.setData({
        'playInfo.duration': formatTime(that.audio.duration),
        'playInfo.currentTime': formatTime(that.audio.currentTime),
        'playInfo.percent': that.audio.currentTime / that.audio.duration * 100
      })
    })
    // 默认选择第1曲
    this.setMusic(0)
    // 格式化时间
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
  },

  /**
   * 事件类函数
   * changeItem：点击顶部标签栏事件处理
   * changeTab：顶部标签栏事件切换事件处理
   * sliderChange：音乐播放进度条变化事件处理
   * changeMusic：播放列表点击音乐事件处理
   * play：播放音乐按钮点击事件处理
   * pause：暂停音乐播放按钮点击事件处理
   * next：下一首按钮点击事件处理
   */

  /**
   * 点击顶部标签栏事件处理
   * 同时触发changeTab事件处理
   */
  changeItem: function(e) {
    console.log('click changeItem')
    this.setData({item: e.target.dataset.item})
  },
  /**
   * 顶部标签栏事件切换事件处理
   */
  changeTab: function(e) {
    console.log('changeTab')
    this.setData({tab: e.detail.current})
  },
  /**
   * 音乐播放进度条变化事件处理
   */
  sliderChange: function(e) {
    var second = e.detail.value * this.audio.duration / 100
    this.audio.seek(second)
  },
  /**
   * 播放列表点击音乐事件处理
   */
  changeMusic: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },
  /**
   * 播放音乐按钮点击事件处理
   */
  play: function() {
    this.audio.play()
    this.setData({state: 'running'})
    console.log('播放：', this.data.playInfo.name, '-', this.data.playInfo.singer)
  },
  /**
   * 暂停音乐播放按钮点击事件处理
   */
  pause: function() {
    this.audio.pause()
    this.setData({state: 'paused'})
  },
  /**
   * 下一首按钮点击事件处理
   */
  next: function() {
    var index = this.data.playIndex >= this.data.playList.length-1 ? 0 : this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state === 'running') {
      this.play()
    }
  },

  /**
   * 逻辑处理函数
   * setMusic：设置当前播放的音乐
   */

  /**
   * 设置当前播放索引为index的音乐
   */
  setMusic: function(index) {
    var music = this.data.playList[index]
    this.audio.src = music.src
    this.setData({
      playIndex: index,
      'playInfo.name': music.name,
      'playInfo.singer': music.singer,
      'playInfo.coverImg': music.img,
      'playInfo.currentTime': '00:00',
      'playInfo.duration': '00:00',
      'playInfo.percent': 0
    })
  }
})
