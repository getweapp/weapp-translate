Page({
  data:{
    text:"这是一个页面",
    fanyi_lishi:[]
  },
  onLoad (options){
  },
  onReady (){
    // 页面渲染完成
  },
  onShow (){
    // 页面显示
    var that = this
    wx.getStorage({
  	key:"lishi",
  	success (res){
  	  that.setData({
  	  	fanyi_lishi:res.data
  	  })
  	},
  	fail (){
  	  	console.log('读取数据失败!')
  	}
  	})
  },
  onHide (){
    // 页面隐藏
  },
  onUnload (){
    // 页面关闭
  }
})