<template>
    <div class="doctorDetail ptb108 plr30 ">
        <van-nav-bar
            :fixed="true"
            title="耳聋耳鸣"
            left-arrow
            @click-left="onClickLeft"
            class="doctorDetail_nav"
        />
        <div class="doctorDetail_box ptb30">
            <div class="doctorDetail_box_li mb30">
                <van-icon name="wap-home" class="mr20" />
                <span class="txt">医案 - </span>
                <span class="txt">分类 - </span>
                <span class="txt">内科 - </span>
                <span class="txt">耳聋耳鸣</span>
            </div>
            <div class="doctorDetail_box_content">
                <h2 class="title ptb20">世界，您好！</h2>
                <p class="content ptb10">欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。</p>
                <p class="content ptb10">欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。</p>
            </div>
            <div class="doctorDetail_box_share ptb30 mtb100">
                <div @click="collection" class="collection ptb20 plr30 mb20">
                    <van-icon :name="icon" class="icon" /> |
                    <span class="txt">收藏</span>
                </div>
                <div class="share ptb30">
                    <!-- 分享按钮 -->
                    分享：
                    <share :config="share_config"></share>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Share from 'vue-social-share';
    export default {
        name: 'doctorDetail',
        data() {
            return {
                icon: 'like-o',
                share_config: {
                    url: window.location.href,
                    // source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                    title: '世界，您好！', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                    description: 'dsadsadsadsadsadsadsadsadasdsadwqeqwefvzdvxcv', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                    image: 'https://www.zk120.com/zixun/wp-content/uploads/2018/07/p.zk120.net_.cn_2018-07-05_17-59-10.png', // 图片, 默认取网页中第一个img标签
                    sites: ['wechat', 'qq','qzone','weibo'], // 启用的站点 , 'douban'
                    disabled: [], // 禁用的站点
                    wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
                    wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
                } // 分享配置
            };
        },
        components: {
            Share
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {collection} 收藏
             *参数: 切换收藏图标
             */
            collection() {
                if (this.icon === 'like') {
                    this.icon = 'like-o';
                } else {
                    this.icon = 'like';
                }
            }
        },
        created() {

        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar__arrow {
        font-size: 48px;
        color: $coloe_3;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .doctorDetail {
        &_nav {
            height: 108px;
        }
        &_box {
            width: 100%;
            height: 600px;
            &_li {
                display: flex;
                align-items: center;
                .txt {
                    display: inline-block;
                    font-size: 28px;
                    color: $color_999;
                }
            }
            &_content {
                font-size: 30px;
                color: $coloe_3;
                .title {
                    font-size: 60px;
                    border-bottom: 1px solid $ccc-color;
                }
                .content {
                    font-size: 30px;
                    line-height: 60px;
                }
            }
            &_share {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .collection {
                    width: 200px;
                    border: 1px solid #75a2e6;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .icon,.txt {
                        font-size: 30px;
                        color: $coloe_3;
                    }
                }
                .share {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>
