<template>
    <div class="login ptb108">
        <van-nav-bar
                title="登录"
                right-text="注册"
                left-arrow
                @click-left="onGoBack"
                @click-right="onGoRegistered"
                fixed
                class="login_title"
        />
        <div class="login_logo ptb20">
            <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" alt="" class="img">
        </div>
        <div class="plr30 mtb50">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="phone"
                        name="phone"
                        placeholder="手机号"
                        :rules="[{ validator, message: '请输入正确格式的手机号' }]"
                        class="validator"
                        left-icon="https://www.zk120.com/static/accounts/images/accounts_mobile_20180116.png"
                        label-class="icon_img"
                        maxlength="11"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        class="validator"
                        left-icon="https://www.zk120.com/static/accounts/images/verification_code_20180116.png"
                        label-class="icon_img"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        登 陆
                    </van-button>
                </div>
            </van-form>
            <div class="mtb50 forget">忘记密码</div>
        </div>
        <div class="login_otherWay mb200">
            <div class="login_otherWay_title mt20 mb20">其他登录方式</div>
            <div class="login_otherWay_obj mt40 mb40">
                <div class="icon"><img :src="require('../../assets/img/zhifubao.png')" alt="" class="img"></div>
                <div class="icon"><img :src="require('../../assets/img/qq.png')" alt="" class="img"></div>
                <div class="icon"><img :src="require('../../assets/img/weixin.png')" alt="" class="img"></div>
            </div>
        </div>
        <div class="login_agreement ptb20">
            <van-checkbox v-model="checked" @click="getRadio" class="login_agreement_group" checked-color="#333">
                我已经阅读，并同意《 <span class="agreement" @click="getAgreement">用户协议</span> 》
            </van-checkbox>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import { Toast } from 'vant';

    export default {
        name: 'login',
        data() {
            return {
                phone: '',
                password: '',
                checked: true // 是否勾选协议
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
            /** 2020/3/20
            * 作者：王青高
            * 功能：{Function} 跳转注册页
            * 参数：{}
            */
            onGoRegistered() {
                this.$router.push({path: '/registered'});
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{Function} 表单提交-登陆账号
            * 参数：{}
            */
            onSubmit(values) {
                console.log('登陆提交', values);
                axios.post('/login/normallogin', qs.stringify({
                    phone: values.phone,
                    password: values.password
                })).then(res => {
                    let data = res.data;
                    if (res.data.state === '1') {
                        try {
                            localStorage.setItem('user', data.data.user);
                        } catch (err) {
                            console.log('err', err);
                        }
                        this.$router.push('/me');
                    } else {
                        Toast('登录失败！');
                        this.phone = '';
                        this.password = '';
                    }
                });
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{} 校验手机号码
            * 参数：{}
            */
            validator(val) {
                return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{}  // 打开协议
            * 参数：{}
            */
            getAgreement() {

            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            getRadio() {
                if (this.checked) {
                    this.checked = false;
                } else {
                    this.checked = true;
                }
            }
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
    .icon_img{
        padding-bottom:5px;
    }
    .van-button--info {
        background: $bgColor;
        border: 1px solid $color;
        color: $color;
    }
    .login {
        background: $bgc-theme;
        &_title {
            height: 108px;
        }
        &_logo {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .img {
                width: 60%;
                height: 240px;
            }
        }
        .forget {
            text-align: center;
            color: $color_999;
            font-size: 30px;
        }
        &_otherWay {
            position: relative;
            width: 100%;
            &_title {
                position: relative;
                text-align: center;
                &:after {
                    content: '';
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    width: 30%;
                    height: 1px;
                    background: $ccc-color;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    width: 30%;
                    height: 1px;
                    background: $ccc-color;
                }
            }
            &_obj {
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon {
                    width: 85px;
                    height: 100px;
                    &:first-child {
                        border-radius: 50%;
                        .img {
                            border-radius: 50%;
                        }
                    }
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        &_agreement {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
