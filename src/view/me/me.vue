<template>
    <div class="me">
        <div class="me_title mb20 ptb10" @click="goLogin" v-if="!isLogin">
            <img :src="headImg" alt="" class="me_title_img">
            <span class="me_title_txt">点击登录或注册</span>
            <span class="me_title_tips">登录后可获取签到等功能</span>
        </div>
        <div class="me_login mb20 ptb10" @click="openUser" v-else>
            <div class="me_login_name">某某某</div>
            <div class="me_login_money">
                <img :src="moneyImg" alt="" class="img">
                <span class="money ml20">金币：500</span>
            </div>
            <img :src="headImg" alt="" class="me_login_img">
        </div>
        <ul class="me_vip mb20">
            <li class="me_vip_li ptb20 plr30">
                <van-icon name="vip-card-o" class="icon"/>
                <span class="txt pl80">VIP会员</span>
                <button type="button" class="open ptb4 plr20 mr20" @click="openVip">开通</button>
            </li>
            <li class="me_vip_li ptb20 plr30">
                <van-icon name="todo-list-o" class="icon" />
                <span class="txt pl80">每日任务</span>
                <button type="button" class="open ptb4 plr20 mr20" @click="Sign">签到</button>
            </li>
            <li class="me_vip_li ptb20 plr30" @click="footprint">
                <van-icon name="browsing-history-o" class="icon"/>
                <span class="txt pl80">我的足迹</span>
                <span class="footprint mr20">美尼尔综合症</span>
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
        </ul>
        <van-action-sheet v-model="shareMenu" title="选择要分享的平台" class="me_share" :round="false">
            <div class="pb100">
                <swiper class="me_share_swiper ptb40" :options="swiperShare">
                    <swiper-slide class="me_share_swiper_item">
                        <div class="me_share_swiper_item_link">
                            <div class="item_img mb20">
                                <img :src="moneyImg" class="img"/>
                            </div>
                            <p class="txt">微信</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="me_share_swiper_item" @click="shareBtn('qq')">
                        <div class="me_share_swiper_item_link">
                            <div class="item_img mb20">
                                <img :src="moneyImg" class="img"/>
                            </div>
                            <p class="txt">QQ</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="me_share_swiper_item" @click="shareBtn('zone')">
                        <div class="me_share_swiper_item_link">
                            <div class="item_img mb20">
                                <img :src="moneyImg" class="img"/>
                            </div>
                            <p class="txt">QQ空间</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="me_share_swiper_item">
                        <div class="me_share_swiper_item_link">
                            <div class="item_img mb20">
                                <img :src="moneyImg" class="img"/>
                            </div>
                            <p class="txt">微信朋友圈</p>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="ptb20 me_share_cancel" @click="share">取消分享</div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
    import { menuConfig, swiperShare } from './config';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name: 'me',
        data() {
            return {
                headImg: require('../../assets/img/userHead.png'),
                moneyImg: require('../../assets/img/userHead.png'),
                swiperShare,
                menuConfig,
                isLogin: false, // 是否登录
                shareMenu: false, // 是否显示分享好友
            };
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
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
                this.$router.push({path: '/login'});
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            openUser() {
                console.log('点击了我的头像');
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: 分享好友
             *参数:
             */
            share() {
                if(this.shareMenu) {
                    this.shareMenu = false;
                } else {
                    this.shareMenu = true;
                }
            },
            /** 2020-3-22 0022
             *作者: 分享按钮
             *功能:
             *参数:
             */
            shareBtn(type) {
                switch(type) {
                    case 'qq':
                        wx.onMenuShareQQ({
                            title: '', // 分享标题
                            desc: '', // 分享描述
                            link: '', // 分享链接
                            imgUrl: '', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        break;
                    case 'zone':
                        wx.onMenuShareQZone({
                            title: 'QQ空间', // 分享标题
                            desc: 'QQ空间', // 分享描述
                            link: 'QQ空间', // 分享链接
                            imgUrl: 'QQ空间', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        break;
                }
            }
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
                }
                .money {
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
</style>
