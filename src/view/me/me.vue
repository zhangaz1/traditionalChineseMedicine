<template>
    <div class="me">
        <div class="me_title mb20 ptb10" @click="goLogin" v-if="!isLogin">
            <img :src="headImg" alt="" class="me_title_img">
            <span class="me_title_txt">点击登录或注册</span>
            <span class="me_title_tips">登录后可获取签到等功能</span>
        </div>
        <div class="me_login mb20 ptb10" @click="openUser" v-else>
            <div class="me_login_name">{{userInfo.nickname}}</div>
            <div class="me_login_money">
                <!--<img :src="moneyImg" alt="" class="img">-->
                <span class="money">欢迎您回来</span>
            </div>
            <img  v-if="userInfo.headimg" :src="baseUrl + userInfo.headimg" alt="" class="me_login_img">
            <img  v-else :src="headImg" alt="" class="me_login_img">
        </div>
        <ul class="me_vip mb20">
            <li class="me_vip_li ptb20 plr30">
                <van-icon name="vip-card-o" class="icon"/>
                <span class="txt pl80">VIP会员</span>
                <button type="button" class="open ptb4 plr20 mr20" @click="openVip">开通</button>
            </li>
            <!--            <li class="me_vip_li ptb20 plr30">-->
            <!--                <van-icon name="todo-list-o" class="icon" />-->
            <!--                <span class="txt pl80">每日任务</span>-->
            <!--                <button type="button" class="open ptb4 plr20 mr20" @click="Sign">签到</button>-->
            <!--            </li>-->
            <li class="me_vip_li ptb20 plr30" @click="footprint">
                <van-icon name="browsing-history-o" class="icon"/>
                <span class="txt pl80">我的足迹</span>
                <!--                <span class="footprint mr20">美尼尔综合症</span>-->
            </li>
        </ul>
        <ul class="me_vip mb20">
            <li class="me_vip_li ptb20 plr30" v-for="(item, index) of menuConfig" :key="'item' + index" @click="_Router(index)">
                <van-icon :name="item.logoUrl" class="icon"/>
                <span class="txt pl80">{{item.txt}}</span>
            </li>
        </ul>
        <ul class="me_vip mb20">
            <li class="me_vip_li ptb20 plr30" @click="share">
                <van-icon name="share" class="icon"/>
                <span class="txt pl80">分享好友</span>
            </li>
            <li class="me_vip_li ptb20 plr30" @click="quit">
                <van-icon name="exchange" class="icon"/>
                <span class="txt pl80">退出登录</span>
            </li>
        </ul>
<!--        <van-action-sheet v-model="shareMenu" title="选择要分享的平台" class="me_share" :round="false">-->
<!--            <div class="pb100">-->
                <!--                <swiper class="me_share_swiper ptb40" :options="swiperShare">-->
                <!--                    <swiper-slide class="me_share_swiper_item">-->
                <!--                        <div class="me_share_swiper_item_link">-->
                <!--                            <div class="item_img mb20">-->
                <!--                                <img :src="moneyImg" class="img"/>-->
                <!--                            </div>-->
                <!--                            <p class="txt">微信</p>-->
                <!--                        </div>-->
                <!--                    </swiper-slide>-->
                <!--                    <swiper-slide class="me_share_swiper_item" @click="shareBtn('qq')">-->
                <!--                        <div class="me_share_swiper_item_link">-->
                <!--                            <div class="item_img mb20">-->
                <!--                                <img :src="moneyImg" class="img"/>-->
                <!--                            </div>-->
                <!--                            <p class="txt">QQ</p>-->
                <!--                        </div>-->
                <!--                    </swiper-slide>-->
                <!--                    <swiper-slide class="me_share_swiper_item" @click="shareBtn('zone')">-->
                <!--                        <div class="me_share_swiper_item_link">-->
                <!--                            <div class="item_img mb20">-->
                <!--                                <img :src="moneyImg" class="img"/>-->
                <!--                            </div>-->
                <!--                            <p class="txt">QQ空间</p>-->
                <!--                        </div>-->
                <!--                    </swiper-slide>-->
                <!--                    <swiper-slide class="me_share_swiper_item">-->
                <!--                        <div class="me_share_swiper_item_link">-->
                <!--                            <div class="item_img mb20">-->
                <!--                                <img :src="moneyImg" class="img"/>-->
                <!--                            </div>-->
                <!--                            <p class="txt">微信朋友圈</p>-->
                <!--                        </div>-->
                <!--                    </swiper-slide>-->
                <!--                    <div class="swiper-pagination" slot="pagination"></div>-->
                <!--                </swiper>-->
<!--                <div class="share ptb30">-->
<!--                    <vshare :vshareConfig="vshareConfig"/>-->
<!--                </div>-->
<!--                <div class="ptb20 me_share_cancel" @click="share">取消分享</div>-->
<!--            </div>-->
<!--        </van-action-sheet>-->
        <div class="mask" v-if="shareMenu">
            <div class="card plr30 ptb30">
                <div class="card_img"
                     id="card_img"
                     @touchstart="gtouchstart($event)"
                     @touchend="gtouchend($event)"
                     @touchmove="gtouchmove()">
                    <img :src="require('../../assets/image/0001.jpg')" alt="" class="img">
                </div>
                <div class="bottom">
                    <div id="qrcode" class="mr20"></div>
                    <div class="bottom_content plr20 ptb20">
                        <div class="title mb20">{{title}}</div>
<!--                        <div class="txt">{{description}}</div>-->
                    </div>
                </div>
                <div class="close" @click.stop="shareMenu = !shareMenu">
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
    import { menuConfig, swiperShare } from './config';
    import Cookies from "js-cookie";
    // import vshare from 'vshare';
    import { EventBus } from "@/utils/event-bus";
    import { baseUrl } from '@/utils';
    import { getUserInfo, logout } from '@/api/login';
    export default {
        name: 'me',
        data() {
            return {
                headImg: require('../../assets/img/userHead.png'),
                moneyImg: require('../../assets/img/money.png'),
                swiperShare,
                menuConfig,
                isLogin: false, // 是否登录
                shareMenu: false, // 是否显示分享好友
                userInfo: '',
                // vshareConfig: {
                //     shareList: ['qzone', 'tsina', 'sqq', 'tieba', 'weixin', 'more'],
                //     common: {
                //         bdText: '',
                //         bdDesc: '',
                //         bdUrl: window.location.hostname,
                //         bdPic: 'https://www.zk120.com/zixun/wp-content/uploads/2018/07/p.zk120.net_.cn_2018-07-05_17-59-10.png'
                //     },
                //     share: [{
                //         bdSize: 32
                //     }]
                // },
                baseUrl,
                title: '书库与医案',
                description: ''
            };
        },
        components: {
            // vshare
        },
        created() {
            localStorage.setItem('isDisplay', 'true');
            // 检测是否用户登录
            if (Cookies.get('shuan120token')) {
                this.userInfo = JSON.parse(localStorage.getItem('user'));
                if (this.userInfo) {
                    this.isLogin = true;
                }
            }
        },
        beforeCreate(to, from, next) {
            window._bd_share_main = '';
        },
        methods: {
            /** 2020/3/31
             * 作者：王青高
             * 功能：{} 获取用户信息
             * 参数：{}
             */
            getUserInfo() {
                getUserInfo().then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        this.userInfo = result.userinfo;
                    }
                });
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 开通会员
             * 参数：{}
             */
            openVip() {
                this.$router.push('/buyVip');
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} Sign : 签到
             * 参数：{}
             */
            Sign() {
                console.log('签到');
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 跳转我的足迹
             * 参数：{}
             */
            footprint() {
                this.$router.push('/footprint');
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 跳转学习方案、联系客服、反馈建议、分享好友 三个模块
             * 参数：{Number} index: 0-学习方案, 1-联系客服, 2-反馈建议，3-分享好友
             */
            _Router(index) {
                switch (index) {
                    case 0:
                        this.$router.push('/learnPlan');
                        break;
                    case 1:
                        this.$router.push('/contactUs');
                        break;
                    case 2:
                        this.$router.push('/feedBack');
                        break;
                }
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 跳转登录页面
             * 参数：{}
             */
            goLogin() {
                this.$router.push('/login');
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{} 跳转个人资料
             * 参数：{}
             */
            openUser() {
                this.$router.push('/userInfo');
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: 分享好友
             *参数:
             */
            share() {
                if (this.shareMenu) {
                    this.shareMenu = false;
                } else {
                    this.shareMenu = true;
                    this.$nextTick(() => {
                        this.qrcode();
                    });
                }
            },
            /** 2020/3/25
             * 作者：王青高
             * 功能：{} 退出登录
             * 参数：{}
             */
            quit() {
                logout().then(res => {
                    if (res.state === '1') {
                        localStorage.removeItem('user');
                        this.$router.push('/login');
                    }
                });
            },
            /** 2020-3-22 0022
             *作者: 分享按钮
             *功能:
             *参数:
             */
            shareBtn(type) {
                switch (type) {
                    case 'qq':
                        // wx.onMenuShareQQ({
                        //     title: '', // 分享标题
                        //     desc: '', // 分享描述
                        //     link: '', // 分享链接
                        //     imgUrl: '', // 分享图标
                        //     success: function () {
                        //         // 用户确认分享后执行的回调函数
                        //     },
                        //     cancel: function () {
                        //         // 用户取消分享后执行的回调函数
                        //     }
                        // });
                        break;
                    case 'zone':
                        // wx.onMenuShareQZone({
                        //     title: 'QQ空间', // 分享标题
                        //     desc: 'QQ空间', // 分享描述
                        //     link: 'QQ空间', // 分享链接
                        //     imgUrl: 'QQ空间', // 分享图标
                        //     success: function () {
                        //         // 用户确认分享后执行的回调函数
                        //     },
                        //     cancel: function () {
                        //         // 用户取消分享后执行的回调函数
                        //     }
                        // });
                        break;
                }
            },
            /** 2020/4/8
            * 作者：王青高
            * 功能：{} 二维码
            * 参数：{}
            */
            qrcode() {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 80,
                    height: 80, // 高度
                    text: that.baseUrl // 二维码内容
                });
                let qrcode2 = new QRCode('qrcode2', {
                    width: 200,
                    height: 200, // 高度
                    text: that.baseUrl // 二维码内容
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
                this.timer = 0;
                html2canvas(document.getElementById('qrcode2')).then(canvas => {
                    let imgUrl = canvas.toDataURL('image/png');
                    this.dataURL = imgUrl;
                    var a = document.createElement('a'); // 生成一个a元素
                    var event = new MouseEvent('click'); // 创建一个单击事件
                    a.download = name || 'photo'; // 设置图片名称
                    a.href = this.dataURL; // 将生成的URL设置为a.href属性
                    a.download = this.title;
                    a.dispatchEvent(event); // 触发a的单击事件
                });
            }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: true });
            this.getUserInfo();
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .me {
        &_title {
            background: $bgc-theme;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 200px;
            &_img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            &_txt {
                font-size: 32px;
                color: $coloe_3;
            }
            &_tips {
                font-size: 26px;
                color: $ccc-color;
            }
        }
        &_vip {
            background: $bgc-theme;
            &_li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                border-bottom: 1px solid $ccc-color;
                min-height: 60px;
                &:after {
                    content: '';
                    position: absolute;
                    right: 20px;
                    width: 14px;
                    height: 14px;
                    border-top: 4px solid $ccc-color;
                    border-right: 4px solid $ccc-color;
                    transform: rotate(45deg);
                }
                &:last-child {
                    border-bottom: transparent;
                }
                .icon {
                    position: absolute;
                    font-size: 60px;
                    left: 30px;
                    color: $color_666;
                }
                .txt {
                    display: inline-block;
                    font-size: 32px;
                    color: $color_666;
                }
                .open {
                    border-radius: 10px;
                    background: transparent;
                    border: 1px solid #f97e80;
                    color: #f97e80;
                }
                .footprint {
                    color: $color_666;
                }
            }
        }
        &_login {
            background: $bgc-theme;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 200px;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                right: 20px;
                width: 14px;
                height: 14px;
                border-top: 4px solid $ccc-color;
                border-right: 4px solid $ccc-color;
                transform: rotate(45deg);
            }
            &_name {
                font-size: 48px;
            }
            &_money {
                .img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    padding-bottom: 10px;
                }
                .money {
                    font-size: 36px;
                    color: $color_666;
                }
            }
            &_img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            &_txt {
                font-size: 32px;
                color: $coloe_3;
            }
            &_tips {
                font-size: 26px;
                color: $ccc-color;
            }
        }
        &_share {
            background: #ebeef3;
            .van-action-sheet__close {
                display: none;
            }
            &_swiper {
                &_item {

                    &_link {

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        .item_img {
                            width: 100px;
                            height: 100px;
                            .img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .txt {
                            font-size: 28px;
                            color: $color_666;
                        }
                    }
                }
            }
            &_cancel {
                @include flex-center();
                background: $bgc-theme;
                height: 50px;
            }
        }
    }
    .share {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(3, 3, 3, .6);
        z-index: 999999;
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
        background: $bgc-theme;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: auto !important;
        z-index: 9999;
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
                @include flex-center();
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
    .doctorDetail_box_code {
        opacity: 0;
        @include flex-center();
        width: 100%;
        height: 500px;
        user-select: auto !important;
    }
</style>
