const menuConfig = [
    {
        'logoUrl': 'cluster-o',
        'txt': '学习方案'
    },
    {
        'logoUrl': 'service-o',
        'txt': '联系客服'
    },
    {
        'logoUrl': 'records',
        'txt': '反馈建议'
    }
];
const swiperShare = {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
};
export {
    menuConfig,
    swiperShare
};

/**
      async getCurNews(cate_id, model_id, id) {
        const show_self = 1;
        let shareInfo;
        let content_s;
        let partter = /<[^>]+>/gim; // 匹配第一个标签
        let imgReg = /<img.*?(?:>|\/>)/gi; // 匹配img标签
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 匹配img标签内的src
        let imgSrc;
        let src;
        let logoImg;
        let self = this;
        const result = await reqCurData({cate_id, model_id, id, show_self});
        if (result.status === 1) {
          this.curInfo = result.data;
          shareInfo = result.share_info.pkg;
          logoImg = result.share_info.img;
          this.$store.dispatch('get_Cur_News', result.data);
          this.new_name_s = '房产资讯';
          this.title_s = this.curInfo.title;
          let txt = this.curInfo.content.replace(partter,"");
          imgSrc = this.curInfo.content.match(imgReg);
          src = imgSrc[0].match(srcReg);
          txt = txt.replace(/\s+/g, "");
          content_s = txt.substr(0, 25);
          this.share_config.title = this.title_s;
          this.share_config.description = content_s;
          this.share_config.image = src;
        }
        var apiList = [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          // 'chooseImage',
          // 'uploadImage',
          // 'previewImage',
          // 'downloadImage',
          // 'scanQRCode',
          // 'getLocation',
          // 'openLocation'
        ];
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: shareInfo.appId, // 必填，公众号的唯一标识
          timestamp: shareInfo.timestamp, // 必填，生成签名的时间戳
          nonceStr: shareInfo.nonceStr, // 必填，生成签名的随机串
          signature: shareInfo.signature,// 必填，签名
          jsApiList: apiList // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {  //需在用户可能点击分享按钮前就先调用
          wx.onMenuShareAppMessage({
            title: self.title_s || '', // 分享标题
            desc: content_s || '', // 分享描述
            link: shareInfo.url || '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: logoImg || '', // 分享图标
            success: function (res) {
              // 设置成功
              // console.log(res);
            },
            error: function(err) {
              // console.log(err);
            }
          });
          wx.onMenuShareTimeline({
            desc: self.title_s || "", // 分享描述
            title: content_s || "", // 分享标题
            link: shareInfo.url || "", // 分享链接
            imgUrl: logoImg || "", // 分享图标
            success: function(res) {
              console.log('朋友圈分享', res);
              //  alert('已分享');
            },
            cancel: function(res) {
              //alert('已取消');
            },
            fail: function(res) {
              //alert(JSON.stringify(res));
            }
          });
          wx.onMenuShareQQ({
            desc: self.title_s || "", // 分享描述
            title: content_s || "", // 分享标题
            link: shareInfo.url || "", // 分享链接
            imgUrl: logoImg || "", // 分享图标
            success: function(res) {
              //  alert('已分享');
            },
            cancel: function(res) {
              //alert('已取消');
            },
            fail: function(res) {
              //alert(JSON.stringify(res));
            }
          });
          wx.onMenuShareWeibo({
            desc: self.title_s || "", // 分享描述
            title: content_s || "", // 分享标题
            link: shareInfo.url || "", // 分享链接
            imgUrl: logoImg || "", // 分享图标
            success: function(res) {
              //  alert('已分享');
            },
            cancel: function(res) {
              //alert('已取消');
            },
            fail: function(res) {
              //alert(JSON.stringify(res));
            }
          });
        });
      },*/