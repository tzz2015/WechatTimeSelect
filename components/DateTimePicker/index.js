// components/component-tag-name.js
const utils = require('../../utils/activity_util')

// 初始化日期模态框数据
let date = new Date();
let years = [];
let months = [];
let days = [];
let hours = [];
let minutes = [];

for (let i = date.getFullYear() - 5; i <= (date.getFullYear() + 5); i++) {
  years.push(i + "年")
}
for (let i = 1; i <= 12; i++) {
  months.push(i + "月")
}
for (let i = 1; i <= 31; i++) {
  days.push(i + "日")
}
for (let i = 0; i <= 23; i++) {
  hours.push(i + "")
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i + "")
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 初始化时间
    timevalue: {
      type: String,
      value: ''
    },
    // 是否显示时间控件
    openflag: {
      type: Boolean,
      value: true
    },
    // 标记
    tag:{
      type:String,
      value:''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectValue:[],
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  },



  /**
   * 组件的方法列表
   */
  methods: {
    //取消
    canslebtn() {
      this.triggerEvent("cancelBtn");
    },
    //确认
    closebtn() {
      
      const {
        year,
        month,
        day,
        hour,
        minute
      } = this.data;
      let selectTime = utils.getDate(year, month, day, hour, minute)
      console.log('selectTime', selectTime)
      let data={
        time: selectTime,
        tag:this.properties.tag
      }
      this.triggerEvent("confirmBtm",data);
    },
    //改变数据
    fnbindChange(e) {
      let val = e.detail.value;
      const year = this.data.years[val[0]];
      const month = this.data.months[val[1]];
      const day = this.data.days[val[2]];
      const hour = this.data.hours[val[3]];
      const minute = this.data.minutes[val[4]];

      //如果点击月份  那么后面日跟着变换数据
      let days = [];
      const daynum = utils.mGetDate(year.substr(0, year.length - 1), month.substr(0, month.length - 1));
      for (let i = 1; i <= daynum; i++) {
        days.push(i + "日")
      }

      this.setData({
        days,
        year,
        month,
        day,
        hour,
        minute
      })
    },
    showNowTime() {

      // 根据选择项目  传去对应数据  根据开始结束时间获取索引  设置面板默认数据

      let selectValue = [2019, 0, 0, 0, 0];
      let arr = [];
      console.log(this.properties.timevalue)
      if (this.properties.timevalue) {
        arr = utils.getarrWithtime(this.properties.timevalue)
      } else {
        arr = utils.getarrWithtime(utils.getobjDate())
      }

      const {
        years,
        months,
        days,
        hours,
        minutes
      } = this.data;
      //根据arr  数据索引
      selectValue[0] = years.indexOf(arr[0] + '年');
      selectValue[1] = months.indexOf(arr[1] + '月');
      selectValue[2] = days.indexOf(arr[2] + '日');
      selectValue[3] = hours.indexOf(arr[3]);
      selectValue[4] = minutes.indexOf(arr[4]);
      const year = arr[0] + '年';
      const month = arr[1] + '月';
      const day = arr[2] + '日';
      const hour = arr[3];
      const minute = arr[4];

      this.setData({
        selectValue,
        years,
        months,
        days,
        hours,
        minutes,
        year,
        month,
        day,
        hour,
        minute
      })

    }

  },
  lifetimes: {
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，
    //原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    created: function() {
      console.log('Component-1 lifetimes >> created');
    },
    attached: function() {
      console.log('Component-1 lifetimes >> attached');
    },
    ready: function() {
      console.log('Component-1 lifetimes >> ready');
      this.showNowTime()
    },
    moved: function() {
      console.log('Component-1 lifetimes >> moved');
    },
    detached: function() {
      console.log('Component-1 lifetimes >> detached');
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show: function() {
      console.log('Component-1 pageLifetimes >> Show');
    },
    hide: function() {
      console.log('Component-1 pageLifetimes >> Hide');
    }
  }
})