<template>
    <div class="doctorDetail ptb108 plr30" v-if="article" oncontextmenu="return false" onselectstart="return false">
        <van-nav-bar
            :fixed="true"
            :title="article.title"
            left-arrow
            @click-left="onClickLeft"
            class="doctorDetail_nav"
        />
        <div class="doctorDetail_box ptb30">
            <div class="doctorDetail_box_li mb30">
                <van-icon name="wap-home" class="mr20" />
                <span class="txt">医案 - </span>
                <span class="txt">分类 - </span>
                <span class="txt">{{lastchannelname}} - </span>
                <span class="txt">{{currchannelname}}</span>
            </div>
            <div class="doctorDetail_box_content">
                <h2 class="title ptb20" v-html="ruleTitle(article.description, title)"></h2>
                <p class="content ptb10" v-html="ruleTitle(article.content, title)"></p>
            </div>
            <div class="doctorDetail_box_share ptb30 mtb100">
                <div class="collection ptb20 plr30 mb20">
                    <div @click="collection" class="collection_txt mr20">
                        <van-icon :name="icon" class="icon mr20" /> |
                        <span class="txt ml20">收藏</span>
                    </div>
                    <div @click="share" class="collection_txt">
                         | <span class="txt ml20">分享</span>
                    </div>
                </div>
                <div class="share ptb30 plr30">
                    <!-- 分享按钮 -->
<!--                    <vshare :vshareConfig="vshareConfig"/>-->
                </div>
            </div>
        </div>
        <div class="mask" v-if="isShare">
            <div class="card plr30 ptb30">
                <div class="card_img"
                     id="card_img"
                     @touchstart="gtouchstart($event)"
                     @touchend="gtouchend($event)"
                     @touchmove="gtouchmove()">
                    <img :src="article.img" alt="" class="img" v-if="article.img">
                    <img :src="require('../../../assets/img/no_img.jpg')" alt="" class="img" v-else>
                </div>
                <div class="bottom">
                    <div id="qrcode" class="mr20"></div>
                    <div class="bottom_content plr20 ptb20">
                        <div class="title mb20">{{article.title}}</div>
                        <div class="txt">{{article.description}}</div>
                    </div>
                </div>
                <div class="close" @click.stop="isShare = !isShare">
                    <van-icon name="clear" />
                </div>
            </div>
        </div>
        <div class="doctorDetail_box_code">
            <!--在这里插入内容-->
            <div id="qrcode2" ></div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import html2canvas from 'html2canvas';
    import { getDoctorArticleDetail, addToCollectionInfo } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { Toast } from 'vant';
    // import vshare from 'vshare';
    import { baseUrl } from '@/utils';
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'doctorDetail',
        data() {
            return {
                icon: 'like-o',
                // vshareConfig: {
                //     shareList: ['qzone', 'tsina', 'sqq', 'tieba', 'weixin', 'more'],
                //     common: {
                //         bdText: '',
                //         bdDesc: '',
                //         bdUrl: window.location.href,
                //         bdPic: 'https://www.zk120.com/zixun/wp-content/uploads/2018/07/p.zk120.net_.cn_2018-07-05_17-59-10.png',
                //     },
                //     share: [{
                //         bdSize: 32
                //     }],
                //     image: {
                //         viewType: 'collection',
                //         viewSize: 64
                //     }
                // },
                article: null, // 存储文章详情
                baseUrl,
                currchannelname: '',
                lastchannelname: '',
                isShare: false, // 是否显示分享图片
                codeUrl: window.location.href,
                firstFlag: true,
                dataURL: '',
                title: '', // 搜索关键字
                timer: 0 // 计时器
            };
        },
        // beforeCreate(to, from , next) {
        //     window._bd_share_main = '';
        // },
        components: {
            // vshare
        },
        computed: {
            ruleTitle
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
                let id = this.article.id;
                addToCollectionInfo({ id }).then(res => {
                    if (res.state === '1') {
                        if (res.msg === '取消收藏成功!') {
                            this.icon = 'like-o';
                        } else {
                            this.icon = 'like';
                        }
                        Toast(res.msg);
                    }
                });
            },
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 获取文章详情信息
             *参数: {id} 文章id
             */
            getDoctorArticleDetail(id) {
                getDoctorArticleDetail({ id }).then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        this.article = result.info;
                        this.currchannelname = result.currchannelname;
                        this.lastchannelname = result.lastchannelname;
                        if (result.isCollection === 0) {
                            this.icon = 'like-o';
                        } else {
                            this.icon = 'like';
                        }
                        // this.$set(this.vshareConfig.common, 'bdText', this.article.title);
                        // this.$set(this.vshareConfig.common, 'bdDesc', this.article.description);
                    };
                });
            },
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 分享按钮
            * 参数：{}
            */
            share() {
                // let self = this;
                if (this.isShare) {
                    this.isShare = false;
                } else {
                    this.isShare = true;
                    this.$nextTick(() => {
                        this.qrcode();
                    });
                }
            },
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 生成二维码
            * 参数：{}
            */
            qrcode() {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 80,
                    height: 80, // 高度
                    text: that.codeUrl // 二维码内容
                });
                let qrcode2 = new QRCode('qrcode2', {
                    width: 300,
                    height: 300, // 高度
                    text: that.codeUrl // 二维码内容
                });
            },
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 长按复制二维码
             * 参数：{}
             */
            gtouchstart(event) {
                this.timer = setTimeout(() => {
                    this.$nextTick(() => {
                        this._copy();
                    });
                }, 500); // 这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
                return false;
            },
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 判断间隔是否大于500毫秒
             * 参数：{}
             */
            gtouchend() {
                if (this.timer) clearTimeout(this.timer); // 清除定时器
                if (this.timer !== 0) {
                    // 这里写要执行的内容（尤如onclick事件）
                    // this._copy();
                }
                return false;
            },
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
             * 参数：{}
             */
            gtouchmove() {
                if (this.timer) clearTimeout(this.timer); // 清除定时器
                this.timer = 0;
            },
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 拷贝图形二维码
             * 参数：{}
             */
            _copy() {
                let self = this;
                this.timer = 0;
                let qrcode2 = document.getElementById('qrcode2');
                html2canvas(qrcode2, {
                    width: window.document.body.offsetWidth, // 获取当前网页的宽度
                    height: 320, // 获取当前网页的高度
                    allowTaint: true,
                    taintTest: false,
                    dpi: window.devicePixelRatio,
                    windowWidth: document.body.scrollWidth, // 获取X方向滚动条内容
                    windowHeight: document.body.scrollHeight, // 获取Y方向滚动条内容
                    onrendered: function (canvas) {
                        self.dataURL = canvas.toDataURL('image/png');// 生成的格式
                    },
                    x: 0,
                    y: window.pageYOffset,
                }).then(canvas => {
                    let imgUrl = canvas.toDataURL('image/png');
                    this.dataURL = imgUrl;
                    var a = document.createElement('a'); // 生成一个a元素
                    var event = new MouseEvent('click'); // 创建一个单击事件
                    a.download = name || 'photo'; // 设置图片名称
                    a.href = this.dataURL; // 将生成的URL设置为a.href属性
                    a.download = this.article.title;
                    a.dispatchEvent(event); // 触发a的单击事件
                });
            }
        },
        updated() {
            // let img = document.getElementsByTagName('img');
            // for (let i = 0; i < img.length; i++) {
            //     img[i].style.width = '100%';
            //     img[i].style.height = '200px';
            // }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
            if (this.$route.query) {
                let obj = this.$route.query;
                if (obj.title) this.title = obj.title;
                this.getDoctorArticleDetail(obj.id);
            } else {
                this.$router.push('/doctorCase');
            }
        }
    };
</script>
<style>
    .doctorDetail_box_content img {
        width: 100%;
        /*height: 100%;*/
    }
</style>
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
                /*height: 600px;*/
                overflow-y: scroll;
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
                    border: 1px solid #75a2e6;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .icon,.txt {
                        font-size: 30px;
                        color: $coloe_3;
                    }
                    &_txt {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                    }
                }
                .share {
                    display: flex;
                    align-items: center;
                }
            }
            &_code {
                position: fixed;
                left: 0;
                top: 60px;
                opacity: 0;
                @include flex-center();
                width: 100%;
                height: 500px;
                user-select: auto !important;
            }
        }
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(3, 3, 3, .6);
        z-index: 999;
    }
    .card {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 500px;
        height: 600px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 9999;
        user-select: auto !important;
        &_img {
            width: 100%;
            height: 400px;
            .img {
                width: 100%;
                height: 400px!important;
            }
        }
        .bottom {
            display: flex;
            align-items: center;
            height: 200px;
            width: 100%;
            &_content {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                .title {
                    font-size: 48px;
                    font-weight: bold;
                }
                .txt {
                    font-size: 28px;
                    color: $ccc-color;
                }
            }
        }
        .close {
            position: absolute;
            left: calc(50% - 50px);
            bottom: -200px;
            width: 100px;
            height: 100px;
            color: $color-default;
            font-size: 100px;
        }
    }
</style>
