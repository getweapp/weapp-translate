/**
 * 引入MD5生成文件
 * @type {[type]}
 */
var md5 = require('../../utils/md5.js')
/**
 * 引入API接口地址文件
 * @type {[type]}
 */
var api = require('../../utils/api.js')
Page({
  data:{
    text:"这是一个页面",
    textarea_placeholder:"请输入要翻译的内容",
    btn_text:"翻译",
    btn_text_null:"清空",
    textarea_text:"",
    result_text:"nothing...",
    result:"结果",
    fanyi_lishi:[],
    fanyi_src:"../../images/fanyi.png"
  },
  btn_click_null (){
    this.setData({
      textarea_text:"",
      result_text:"nothing..."
    })
  },
  textarea_bindinput(res){
    this.setData({
      textarea_text:res.detail.value
    })
  },
  bindTextAreaFocus (){
    this.setData({
      fanyi_src:"../../images/fanyi_selected.png"
    })
  },
  btn_click (){
    let text = this.data.textarea_text
    if(text == '' || text == null){
      wx.showToast({
        title: '请输入要翻译的内容', //提示的内容
        icon: 'success', //图标，只支持"success"、"loading"
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500, 最大为10000
      })
      return;
    }
    const that = this
    wx.request({
      url: api.BAIDU_FANYI_URL,
        data:{
          "keyword":text
        },
        method:'get',
        header: {
            'Content-Type': 'jsonp'
        },
        success (res) {
          if(res.data.error_code){
            return;
          }
          that.setData({
            result_text:res.data.trans_result[0].dst,
            result:that.data.textarea_text,
            textarea_text:""
          })
          var lishi = wx.getStorageSync('lishi') || []
          lishi.unshift(res.data.trans_result[0])
          wx.setStorage({
            key:"lishi",
            data:lishi
          })

          wx.getStorage({
            key:"lishi",
            success (res){
              if (res.data != null) {
                that.setData({
                  result_text:res.data[0].src,
                  result:res.data[0].dst,
                  fanyi_lishi:res.data
               })
              }
            }
          })
        },
        fail (res){
          wx.showModal({
            title: '请求失败',//提示的标题
            content: '请检查网络设置',//提示的内容
            showCancel: false, //是否显示取消按钮，默认为 true
            cancelText: '取消', //取消按钮的文字，默认为"取消"
            cancelColor:'#000000',//取消按钮的文字颜色，默认为"#000000"
            confirmText: '确定',//确定按钮的文字，默认为"确定"
            confirmColor: '#3CC51F',//确定按钮的文字颜色，默认为"#3CC51F"
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }else{
                 console.log('用户点击取消或其他')
              }
            },
            fail (){
              console.log('失败')
            }
          })
        }
    })
  },
  bindTextAreaBlur (res){
    this.setData({
      textarea_text:res.detail.value,
      fanyi_src:'../../images/fanyi.png'
    })
  },
  onLoad (options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady (){
    // 页面渲染完成
    var that =this
    wx.getStorage({
      key:"lishi",
      success (res){
        if (res.data != null) {
          that.setData({
            result_text:res.data[0].src,
            result:res.data[0].dst,
            fanyi_lishi:res.data
         })
        }
      }
    })
  },
  onShow (){
    // 页面显示
  },
  onHide (){
    
  },
  onUnload (){
    // 页面关闭
    
  }
})