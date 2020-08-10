let ctx;
Page({
  //初始化数据
  data: {
    pen: {
      lineWidth: 5,
      color: "#000000"
    },
    array: ['16px', '18px', '24px', '30px'],
    index: 0,
  },
  //加载后初渲染
  onLoad(options) {
    ctx = wx.createCanvasContext('myCanvas');
    ctx.setStrokeStyle(this.data.pen.color);
    ctx.setLineWidth(this.data.pen.lineWidth);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
  },
  //画笔移动开始
  touchstart(e) {
    ctx.setStrokeStyle(this.data.pen.color);
    ctx.setLineWidth(this.data.pen.lineWidth);
    ctx.moveTo(e.touches[0].x, e.touches[0].y);
  },
  //画笔移动跟踪
  touchmove(e) {
    let x = e.touches[0].x;
    let y = e.touches[0].y;
    ctx.lineTo(x, y)
    ctx.stroke();
    ctx.draw(true);
    ctx.moveTo(x, y)
  },
  //简易画笔大小选择器
  penselect(e) {
    this.setData({ 'pen.lineWidth': e.target.dataset.param })
  },
  //简易颜色选择器
  colorselect(e) {
    this.setData({ 'pen.color': e.target.dataset.param })
  },
  //保存图片到相册
  saveImg: function() {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      fileType:'jpg',
      success(res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({
                  title: '图片保存成功'
                })
              }
            })
          }
        })
      }
    }, this)
  },
  //清除画板
  clearCanvas() {
    ctx.draw();
  },
  //下拉选取画笔大小
  bindPickerChange(e) {
    let i = e.detail.value;
    this.setData({index : i});
    // this.setData({'pen.lineWidth' : e.detail.value})
    if(i==0){
      this.setData({'pen.lineWidth' : '5'})
    };
    if(i==1){
      this.setData({'pen.lineWidth' : '8'})
    };
    if(i==2){
      this.setData({'pen.lineWidth' : '11'})
    };
    if(i==3){
      this.setData({'pen.lineWidth' : '14'})
    }
    },
    //分享功能
  onShareAppMessage: function () {
    return {
      title: 'Gin\'s miniProgram',
      path: '/pages/index/index'
    }
  },
})