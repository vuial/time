
var a = getApp(), t = require("../../utils/utils.js");
Page({
  data: {
    history: [],
    activeIndex: 2,
    today: "",
    remaining: 0,
    timer: null,
    doodle: ""
  },
       onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  calProgress: function(a, e) {
        var i = a.split("-"), s = "", n = 0, o = t.formatDay();
        switch (clearInterval(this.timer), i.length) {
          case 1:
            s = i[0] + " 年", n = t.fixedDecimal(100 * (1 - o.past_days / o.year_total), 2);
            break;

          case 2:
            s = i[0] + " 年 " + i[1] + " 月", n = t.fixedDecimal(100 * (1 - (o.day - 1) / o.month_total), 2);
            break;

          case 3:
            s = i[0] + " 年 " + i[1] + " 月 " + i[2] + " 日", n = t.fixedDecimal(100 * (1 - o.past_time / 864e5), 4), 
            this.timer = setInterval(function() {
                n <= .01 && (this.handleData(), this.handleDoodle()), this.init();
            }.bind(this), 1e3);
        }
        this.setData({
            activeIndex: e,
            today: s,
            remaining: n
        });
    },
    viewHistory: function() {
        var t = this.data.history, e = this.data.activeIndex ? this.data.activeIndex - 1 : t.length - 1;
        t.length && this.calProgress(t[e], e), a.tdsdk.event({
            id: "点击年月日切换",
            label: "",
            params: {}
        });
    },
    init: function() {
        this.calProgress(this.data.history[this.data.activeIndex], this.data.activeIndex);
    },
    handleData: function() {
        var a = t.formatDay(), e = [ a.year.toString(), a.year + "-" + a.month, a.year + "-" + a.month + "-" + a.day ];
        this.setData({
            history: e
        });
  },
  handleDoodle: function () {
    var a = t.formatDay();
    this.setData({
      doodle: t.holidayPhoto(a.month + "-" + a.day)
    });
  }
  ,

  onShow: function () {
    this.handleData(), this.handleDoodle(), this.init();
  }
});