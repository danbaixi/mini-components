Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗模式，弹窗模式需要配置show展示
    popup: {
      type: Boolean,
      value: false
    },
    // 是否显示
    show: {
      type: Boolean,
      value: false
    },
    // 背景图数组，多张图随机展示
    images: {
      type: Array,
      value: [
        'https://p26-tt.byteimg.com/origin/pgc-image/25b623bee9014733a200f6fe4f84b0db.png'
      ]
    },
    // 以下单位均为px
    // 图片宽度
    width: {
      type: Number,
      value: 260
    },
    // 图片高度
    height: {
      type: Number,
      value: 160
    },
    // 验证码大小，正方形，建议40~80
    catpchaWidth: {
      type: Number,
      value: 40
    },
    // 验证码与背景图的左间距，5~20最佳
    catpchaLeft: {
      type: Number,
      value: 5
    },
    // 滑块大小，60~100最佳
    controlWidth: {
      type: Number,
      value: 60
    },
    // 滑轨高度，40~60最佳
    sliderHeight: {
      type: Number,
      value: 40
    },
    // 安全距离，随机生成的位置不会太靠近边缘，10~20最佳
    safeDistance: {
      type: Number,
      value: 10
    },
    // 可接受的误差范围，4~8最佳
    offset: {
      type: Number,
      value: 4
    },
    // 提示语
    tips: {
      type: String,
      value: '拖动滑块完成拼图'
    },
    // 最高错误次数，达到次数后刷新验证码
    maxFailCount: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fail: true, // 验证失败
    failCount: 0, // 失败次数
    moving: false, // 正在移动
    maskTop: 0, // 缺口位置
    maskLeft: 0 // 缺口位置
  },

  lifetimes: {
    attached() {
      this.init()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      // 限制滑块的范围
      if (this.data.catpchaLeft < 0 || this.data.catpchaLeft > 100) {
        this.data.catpchaLeft = 5
      }
      // 初始化滑块位置
      const controlLeft = this.data.catpchaLeft
      // 滑块最大滑行距离
      const maxSliderLength = this.data.width - this.data.catpchaWidth
      // 获取背景
      const image = this.data.images[parseInt(Math.random() * this.data.images.length)]
      // 随机计算top和left
      const minTop = this.data.safeDistance
      const maxTop = this.data.height - this.data.catpchaWidth - this.data.safeDistance
      const maskTop = parseInt(Math.random() * (maxTop - minTop + 1) + minTop)
      // left
      const minLeft = this.data.width / 2
      const maxLeft = this.data.width - this.data.catpchaWidth - this.data.safeDistance
      const maskLeft = parseInt(Math.random() * (maxLeft - minLeft + 1) + minLeft)
      // 计算clipPath
      const clipPath = `${maskTop}px ${this.data.width - this.data.catpchaWidth - maskLeft}px ${this.data.height - this.data.catpchaWidth - maskTop}px ${maskLeft}px`

      this.setData({
        controlLeft,
        maxSliderLength,
        image,
        maskTop,
        maskLeft,
        clipPath
      })
    },
    // 开始移动
    startHandle(e) {
      this.setData({
        moving: true,
        startX: e.changedTouches[0].clientX
      })
      this.triggerEvent('start')
    },
    // 移动中
    moveHandle(e) {
      let controlLeft = e.touches[0].clientX - this.data.startX + this.data.catpchaLeft
      if (controlLeft < 0) {
        controlLeft = 0
      } else if (controlLeft > this.data.maxSliderLength) {
        controlLeft = this.data.maxSliderLength
      }
      this.setData({
        controlLeft
      })
      this.triggerEvent('moved')
    },
    // 结束移动
    endHandle() {
      this.triggerEvent('end')
      if (this.data.controlLeft <= this.data.maskLeft + this.data.offset && this.data.controlLeft >= this.data.maskLeft - this.data.offset) {
        this.setData({
          fail: false,
          moving: false
        })
        setTimeout(() => {
          this.setData({
            fail: true,
            failCount: 0
          })
        }, 1000);
        // 验证成功
        this.triggerEvent('success')
        return
      }
      if (this.data.failCount + 1 >= this.data.maxFailCount) {
        this.setData({
          failCount: 0,
          moving: false
        })
        setTimeout(() => {
          this.init()
        }, 100);
        return
      }
      this.setData({
        controlLeft: this.data.catpchaLeft,
        moving: false,
        fail: true,
        failCount : this.data.failCount + 1
      })
    },
    // 关闭弹窗
    close() {
      this.setData({
        show: false
      })
      this.triggerEvent('close')
    }
  }
})