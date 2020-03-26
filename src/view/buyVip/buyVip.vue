<template>
    <div class="buyVip pt120">
        <van-nav-bar
                title="VIP会员"
                left-arrow
                @click-left="onGoBack"
                fixed
                class="buyVip_title"
        />
        <div class="buyVip_package ptb40 plr30">VIP会员套餐</div>
        <div class="buyVip_packageItem plr30 ptb20 pb100">
            <van-radio-group v-model="isChoose">
                <div class="buyVip_packageItem_box ptb10 plr10 mb20" :class="{bg: isChoose === '1'}" @click=" isChoose = '1'">
                    <div class="recommended" v-if="recommended === '1'">推荐</div>
                    <div class="left">
                        <h3 class="left_title ptb10 plr10">永久会员</h3>
                        <div class="ptb10 plr10 left_txt">一次购买 永久使用</div>
                    </div>
                    <div class="right">
                        <span class="mr20 right_money"><sub>￥</sub>420</span><van-radio name="1" class="mr20" checked-color="#cbb488"></van-radio>
                    </div>
                </div>
                <div class="buyVip_packageItem_box ptb10 plr10" :class="{bg: isChoose === '2'}"  @click=" isChoose = '2'">
                    <div class="recommended" v-if="recommended === '2'">推荐</div>
                    <div class="left">
                        <h3 class="left_title ptb10 plr10">年卡会员</h3>
                        <div class="ptb10 plr10 left_txt">12个月 15元/月</div>
                    </div>
                    <div class="right">
                        <span class="mr20 right_money"><sub>￥</sub>180</span><van-radio name="2" class="mr20" checked-color="#cbb488"></van-radio>
                    </div>
                </div>
            </van-radio-group>
        </div>
        <div class="buyVip_information plr30 ptb30">
            <div class="buyVip_information_title mb40">账号和购买须知</div>
            <ul class="buyVip_information_ul mb200">
                <li class="li ptb10 pl20 mb10">会员有效期内，所有内容都可使用</li>
                <li class="li ptb10 pl20 mb10">会员服务为虚拟内容服务，开通成功后不支持退款</li>
                <li class="li ptb10 pl20 mb10">委托支付或支付问题请联系：微信(<span class="tel">13260530903</span>)QQ(<span class="qq">250444</span>)</li>
                <li class="li ptb10 pl20 mb10">永久会员无时间和特权限制，一次购买，永久使用</li>
                <li class="li ptb10 pl20 mb10">支付成功未开通会员:1.重新登录2.超过10分钟请联系客服</li>
            </ul>
            <div class="buyVip_information_payment ptb20">
                <div class="method ptb10 pl80" @click="getPay">
                    <img :src="pay" alt="" class="img">支付宝支付
                </div>
                <div class="method ptb10 pl80" @click="getWeChat">
                    <img :src="wechat" alt="" class="img">微信支付
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'buyVip',
        data() {
            return {
                isChoose: '2', // 选择的类型
                recommended: '1', // 是否推荐
                pay: require('../../assets/img/zhifubao.png'),
                wechat: require('../../assets/img/weixin.png')
            };
        },
        methods: {
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: {Function} 调起微信支付
             *参数:
             */
            getWeChat() {
                console.log('调起微信支付');
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: {Function} 调起支付宝支付
             *参数:
             */
            getPay() {
                console.log('调起支付宝支付');
            }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar .van-icon {
        font-size: 48px;
        color: $coloe_3;
    }
    .van-nav-bar__text {
        font-size: 32px;
        color: $coloe_3;
        font-weight: bold;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .buyVip {

        &_title {
            height: 108px;
        }
        &_package {
            font-size: 32px;
            font-weight: bold;
        }
        &_packageItem {
            background: $bgc-theme;
            &_box {
                border: 1px solid $coloe_3;
                display: flex;
                justify-content: space-between;
                position: relative;
                overflow: hidden;
                .recommended {
                    position: absolute;
                    left: -30px;
                    top: 12px;
                    color: #fff;
                    font-size: 24px;
                    width: 120px;
                    height: 30px;
                    background: #b84e50;
                    transform: rotate(-45deg);
                    line-height: 30px;
                    text-align: center;
                    z-index: $head-z-index;
                }
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    width: 98%;
                    height: 90%;
                    border: 1px solid $ccc-color;
                }
                .left {
                    &_title {
                        text-indent: 40px;
                        font-weight: bold;
                    }
                    &_txt {
                        text-indent: 40px;
                        color: $color_999;
                    }
                }
                .right {
                    display: flex;
                    align-items: center;
                    &_money {
                        color: #b84e50;
                        font-weight: bold;
                        font-size: 32px;
                    }
                }
            }
        }
        &_information {
            background: $bgc-theme;
            box-shadow: 0 -10px 30px -10px rgba(3, 3, 3, .1);
            &_title {
                font-size: 36px;
            }
            &_ul {
                .li {
                    @include ellipsis();
                    position: relative;
                    color: $color_999;
                    font-size: 24px;
                    .qq,
                    .tel {
                        color: $color_cbb488;
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 10%;
                        width: 8px;
                        height: 80%;
                        background: $bg_cbb488;
                    }
                }
            }
            &_payment {
                display: flex;
                width: 100%;
                justify-content: space-around;
                align-items: center;
                .method {
                    position: relative;
                    font-size: 36px;
                    border: 1px solid $bg_cbb488;
                    border-radius: 10px;
                    width: 40%;
                    box-sizing: border-box;
                    color: $bg_cbb488;
                    font-weight: bold;
                    .img {
                        position: absolute;
                        left: 10px;
                        top: 3px;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
    .bg {
        background: #eef2f5;
    }
</style>
