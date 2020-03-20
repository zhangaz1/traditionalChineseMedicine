<template>
    <div class="me">
        <div class="me_title mb10 ptb10" @click="goLogin" v-if="!isLogin">
            <img :src="headImg" alt="" class="me_title_img">
            <span class="me_title_txt">点击登录或注册</span>
            <span class="me_title_tips">登录后可获取签到等功能</span>
        </div>
        <div class="me_login mb10 ptb10" @click="openUser" v-else>
            <div class="me_login_name">某某某</div>
            <div class="me_login_money">
                <img :src="moneyImg" alt="" class="img">
                <span class="money ml20">金币：500</span>
            </div>
            <img :src="headImg" alt="" class="me_login_img">
        </div>
        <ul class="me_vip mb10">
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
        <ul class="me_vip">
            <li class="me_vip_li ptb20 plr30" v-for="(item, index) of menuConfig" :key="'item' + index" @click="_Router(index)">
                <van-icon :name="item.logoUrl" class="icon"/>
                <span class="txt pl80">{{item.txt}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { menuConfig } from './config';
    export default {
        name: 'me',
        data() {
            return {
                headImg: require('../../assets/img/userHead.png'),
                moneyImg: require('../../assets/img/userHead.png'),
                menuConfig,
                isLogin: false // 是否登录
            };
        },
        methods: {
            /* 2020/3/20
            * 作者：王青高
            * 功能：{Function} 开通会员
            * 参数：{}
            */
            openVip() {
                console.log('开通会员');
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{Function} Sign : 签到
            * 参数：{}
            */
            Sign() {
                console.log('签到');
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{Function} 跳转我的足迹
            * 参数：{}
            */
            footprint() {
                console.log('我的足迹');
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{Function} 跳转学习方案、联系客服、分享好友 三个模块
            * 参数：{Number} index: 0-学习方案, 1-联系客服, 2-分享好友
            */
            _Router(index) {
                console.log(index);
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{Function} 跳转登录页面
            * 参数：{}
            */
            goLogin() {
                this.$router.push({path: '/login'});
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            openUser() {
                console.log('点击了我的头像');
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
    }
</style>
