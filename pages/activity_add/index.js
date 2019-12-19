const utils = require('../../utils/activity_util')

Page({

  data: {
    value: '2019-12-12 19:12',
    openflag: true, //1日期控件显示  2控件滚动选择 底部页面不滚动
  },

  onLoad(options) {

  },
  tap(){
    this.setData({
      openflag: false,
    })
  },

 
  // 取消
  cancelBtn() {
    this.setData({
      openflag: true,
    })
  },
  // 确定  如果不选择那么默认重置
  confirmBtm(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail.time,
      openflag: true
    })
  }
})