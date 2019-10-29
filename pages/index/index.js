Page({
  data: {
    item: 0,
    tab: 0
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
