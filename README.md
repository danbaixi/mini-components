# 溪的组件库

本项目主要是一些本人开发的微信小程序组件，将来不断更新一些组件，让它成为库。扫码预览

<img src="https://p5-tt.byteimg.com/origin/pgc-image/4c39277ad1274ca7a48413b9b965bdec.jpg" width="20%">

## 使用方法

### 下载或clone源码到本地

所有组件存放在`/components`

demo存放在`/pages`

```shell
git clone https://github.com/danbaixi/mini-components
```

### 复制组件到你的项目

用到哪个组件，就复制哪个到你的项目中

- slider-catpcha 滑块验证码

### 修改页面JSON文件

在需引入组件的页面，修改对应的json文件，比如：

```json
"usingComponents": {
    "slider-catpcha": "/components/slider-catpcha/index"
}
```

### wxml使用组件

```html
<slider-catpcha
    popup="{{popup}}"
    show="{{show}}"
    id="catpcha"
    images="{{images}}"
    width="{{width}}"
    height="{{height}}"
    catpchaWidth="{{catpchaWidth}}"
    catpchaLeft="{{catpchaLeft}}"
    controlWidth="{{controlWidth}}"
    sliderHeight="{{sliderHeight}}"
    bind:success="successHandle"
    bind:fail="failHandle"
    bind:close="closeHandle"
    bind:start="startHandle"
    bind:moved="movedHandle"
    bind:end="endHandle"
></slider-catpcha>
```

## 组件说明

### 1. slider-catpcha 滑块验证码 

#### Props

| 参数         | 说明                     | 类型    | 默认值 |
| ------------ | ------------------------ | ------- | ------ |
| popup        | 弹窗模式                 | Boolean | false  |
| show         | 显示                     | Boolean | false  |
| images       | 背景图数组               | Array   | -      |
| width        | 背景图宽度               | Number  | 260    |
| height       | 背景图高度               | Number  | 160    |
| catpchaWidth | 验证码大小，宽高相等     | Number  | 40     |
| catpchaLeft  | 验证码左间距             | Number  | 5      |
| controlWidth | 滑块大小，建议60-100     | Number  | 60     |
| sliderHeight | 滑轨高度，建议40-60      | Number  | 40     |
| safeDistance | 安全距离，防止太靠近边缘 | Number  | 10     |
| offset       | 验证误差范围，建议4-10   | Number  | 4      |
| tips         | 提示语                   | String  | -      |
| maxFailCount | 最高错误次数，刷新验证码 | Number  | 3      |

#### Events

| 事件名  | 说明         | 回调参数 |
| ------- | ------------ | -------- |
| success | 验证成功事件 | -        |
| fail    | 验证失败事件 | -        |
| close   | 关闭弹窗事件 | -        |
| start   | 开始滑动事件 | -        |
| moved   | 滑动中事件   | -        |
| end     | 结束滑动事件 | -        |

