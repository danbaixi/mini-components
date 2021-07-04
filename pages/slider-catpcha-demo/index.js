// pages/slider-catpcha-demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      'https://p26-tt.byteimg.com/origin/pgc-image/25b623bee9014733a200f6fe4f84b0db.png',
      'https://p6-tt.byteimg.com/origin/pgc-image/118d427b566b4aa49cafa071b18407f9.png',
      'https://p6-tt.byteimg.com/origin/pgc-image/481f55590968428a887a90d75192284d.png',
      'https://p5-tt.byteimg.com/origin/pgc-image/6c3b6ec5fd0247cabd9b16db9fb43c9d.png',
      'https://p9-tt.byteimg.com/origin/pgc-image/bd7a2e14a2614d1e9b9df685e730be6f.png',
      'https://p26-tt.byteimg.com/origin/pgc-image/6edb12996f514a6d8c3ddc97e1d630c9.png',
      'https://p3-tt.byteimg.com/origin/pgc-image/232bbb0cc42a4ac5adb183587498b01b.png',
      'https://p26-tt.byteimg.com/origin/pgc-image/00a86543ff024fdcb7451bd221385f76.png',
    ],
    default: {
      width: 300,
      height: 200,
      catpchaWidth: 60,
      catpchaLeft: 10,
      controlWidth: 60,
      sliderHeight: 50
    },
    popup: false,
    show: true,
    width: 300,
    height: 200,
    catpchaWidth: 60,
    catpchaLeft: 10,
    controlWidth: 60,
    sliderHeight: 50
  },
  onLoad() {
    this.setData({
      winWdith: wx.getSystemInfoSync().windowWidth
    })
  },
  changeValue(e) {
    const name = e.target.dataset.name
    const data = this.data
    data[name] = e.detail.value
    this.setData(data)
    this.selectComponent('#catpcha').init()
  },
  // 显示验证码
  show() {
    this.setData({
      show: true
    })
  },
  // 弹窗模式
  switch() {
    this.setData({
      show: this.data.popup,
      popup: !this.data.popup
    })
    this.selectComponent('#catpcha').init()
  },
  switchShow() {
    this.setData({
      show: !this.data.show
    })
  },
  // 重置
  reset() {
    const data = {}
    for(let key in this.data.default) {
      data[key] = this.data.default[key]
    }
    this.setData(data)
  },
  //验证成功事件  
  successHandle() {
    wx.showToast({
      title: '验证成功',
      duration: 1000,
      icon: 'success'
    })
    setTimeout(() => {
      this.setData({
        show: !this.data.popup
      })
      this.selectComponent('#catpcha').init()
    }, 1000);
  },
  failHandle() {
    console.log('fail...')
  },
  startHandle() {
    console.log('start...')
  },
  movedHandle() {
    // console.log('moved...')
  },
  endHandle() {
    console.log('end...')
  },
  // 关闭弹窗事件
  closeHandle() {
    wx.showToast({
      title: '你关闭了弹窗',
      icon: 'none'
    })
  }
})