//index.js
//获取应用实例
const app = getApp()
console.log(app.globalData)
let aaa = "aa"
if (aaa) {
  console.log("a")
} else {
  console.log("b")
}

function jumpToMain(page) {
  let countTime = 4
  let interval = setInterval(function() {
    countTime--
    page.setData({
      time: countTime
    })
    if (countTime < 1) {
      clearInterval(interval)
      wx.redirectTo({
        url: '../main/main',
      })
    }
  }, 1000)

}

Page({
  data: {
    motto: '小智的demo',
    userInfo: {},
    hasUserInfo: false,
    time: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // jumpToMain: function() {
  //   let countTime = 10
  //   let interval = setInterval(function() {
  //     countTime--
  //     console.log(countTime)
  //     this.setData({
  //       time: countTime
  //     })
  //     if (countTime < 1) {
  //       clearInterval(interval)
  //       wx.navigateTo({
  //         url: '../main/main',
  //       })
  //     }
  //   }, 100)
  // },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      jumpToMain(this)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        jumpToMain(this)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          jumpToMain(this)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    jumpToMain(this)
  }
})