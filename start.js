// start.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '夏季', checked: 'ture' },
      { name: 'down', value: '冬季' },
    ]
  },

  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },
  send: function(){
    var that = this
     //取得门限数据和报警规则
     var thres = this.data.threshold
     var Rule = this.data.rule
     
     //调用百度天气API

    const requestTask = wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8', //百度天气API
      header: {
        'content-type': 'application/json',
      },

      success: function (res) {
        // 利用正则字符串从百度天气API的返回数据中截出今天的温度数据
        var str = res.data.results[0].weather_data[0].date;
        var tmp1 = str.match(/实时.+/);
        var tmp2 = tmp1[0].substring(3, tmp1[0].length - 2);
        var tmp = +tmp2;

	      //温度高于设置的门限值
        if (tmp > 3) {
          if (that.data.rule == "up") { 
	       //规则为高于门限报警，于是报警
            wx.showModal({
              title: '夏季晾干时间预测',
              content: '大概需要24h',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
	   //规则为低于门限报警，于是不报警
          else if (that.data.rule == "down") {
            wx.showModal({
              title: '冬季晾干时间预测',
              content: '大概需要48h+',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
	//温度低于设置的门限值
        else if (tmp <= 3) {
	 //规则为高于门限报警，于是不报警
          if (that.data.rule == "up") {
            wx.showModal({
              title: '夏季晾干时间预测',
              content: '大概需要16h',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
           //规则为低于门限报警，于是报警
          else if (that.data.rule == "down"){
            wx.showModal({
              title: '冬季晾干时间预测',
              content: '大概需要24h',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  back: function () {
    var that = this
    //取得门限数据和报警规则
    var thres = this.data.threshold
    var Rule = this.data.rule

    //调用百度天气API

    const requestTask = wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8', //百度天气API
      header: {
        'content-type': 'application/json',
      },

      success: function (res) {
        // 利用正则字符串从百度天气API的返回数据中截出今天的温度数据
        var str = res.data.results[0].weather_data[0].date;
        var tmp1 = str.match(/实时.+/);
        var tmp2 = tmp1[0].substring(3, tmp1[0].length - 2);
        var tmp = +tmp2;

        //温度高于设置的门限值
        if (tmp > that.data.threshold) {
          if (that.data.rule == "up") {
            //规则为高于门限报警，于是报警
            wx.showModal({
              title: '夏季建议',
              content: '今日阳光甚好，让阳光帮忙晒干吧',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          //规则为低于门限报警，于是不报警
          else if (that.data.rule == "down") {
            wx.showModal({
              title: '冬季建议',
              content: '今天很冷，请关好门窗',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
        //温度低于设置的门限值
        else if (tmp <= that.data.threshold) {
          //规则为高于门限报警，于是不报警
          if (that.data.rule == "up") {
            wx.showModal({
              title: '夏季建议',
              content: '今日有风，建议开窗',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          //规则为低于门限报警，于是报警
          else if (that.data.rule == "down") {
            wx.showModal({
              title: '冬季建议',
              content: '建议把衣服挪入温暖的室内哟',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  getDataFromOneNet: function(){
    //从oneNET请求我们的温度湿度光照的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/23360143/datapoints?datastream_id=Light,Temperature,Humidity&limit=22',
      header: {
        'content-type': 'application/json',
        'api-key': 'NQKwDq9fGPSJ1eaCo8f2w5w69jM='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '../wifi_station/tianqi/tianqi',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },
  getDataFromAlarm: function () {
    //跳转到alarm页面
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/20494521/datapoints?datastream_id=Light,Temperature,Humidity&limit=22',
      header: {
        'content-type': 'application/json',
        'api-key': 'UA1N5s0V6MhpPHVFz=K=iH=eEuM='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '../Alarm/Alarm',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
