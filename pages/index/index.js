Page({
  nav(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  copy() {
    wx.setClipboardData({
      data: 'https://github.com/danbaixi',
      success() {
        wx.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  }
})
