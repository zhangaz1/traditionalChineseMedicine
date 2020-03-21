<template>
    <div class="registered ptb108">
        <van-nav-bar
                title="注册"
                right-text="登录"
                left-arrow
                @click-left="onGoBack"
                @click-right="onGoLogin"
                fixed
                class="registered_title"
        />
        <div class="registered_head ptb20">
            <van-uploader :max-count="1" :class="{isOpacity: isTrue}" @delete="_delete" :before-read="beforeRead" :after-read="afterRead" v-model="headImg" class="registered_head_upLoadImg"/>
            <div class="registered_head_box"></div>
            <div class="registered_head_txt">添加头像</div>
        </div>
        <div class="plr30 mtb50">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="moblie"
                        name="validator"
                        placeholder="手机号"
                        :rules="[{ validator, message: '请输入正确格式的手机号' }]"
                        class="validator"
                        maxlength="11"
                />
                <van-field v-model="name" name="昵称" placeholder="昵称" class="validator" :rules="[{ required: true, message: '请填写昵称' }]" />
                <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        class="validator"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        注册并登陆
                    </van-button>
                </div>
            </van-form>
        </div>
        <div class="registered_agreement ptb20">
            <van-checkbox v-model="checked" @click="getChecke" class="registered_agreement_group" checked-color="#333">
                我已经阅读，并同意《 <span class="agreement" @click="getAgreement">用户协议</span> 》
            </van-checkbox>
        </div>
    </div>
</template>

<script>
    import { Toast, Uploader } from 'vant';
    export default {
        name: 'registered',
        data() {
            return {
                moblie: '',
                password: '',
                name: '',
                checked: true, // 是否勾选协议
                headImg: [],
                isTrue: true
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
            onGoLogin() {
                this.$router.push({path: '/login'});
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{Function} 表单提交-登陆账号
            * 参数：{}
            */
            onSubmit() {
                console.log('登陆提交');
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{} 校验手机号码
            * 参数：{}
            */
            validator(val) {
                console.log('val', val);
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
            getChecke() {
                if (this.checked) {
                    this.checked = false;
                } else {
                    this.checked = true;
                }
            },
            /** 2020-3-21 0021
             *作者: 王青高
             *功能: 进行校验
             *参数:
             */
            beforeRead(file) {
                console.log('上传之前', file);
                if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    return false;
                }
                return true;
            },
            /** 2020-3-21 0021
             *作者:王青高
             *功能:
             *参数:
             */
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log('上传之后', file);
                this.isTrue = false;
            },
            /** 2020-3-21 0021
             *作者: 王青高
             *功能: 删除图片
             *参数:
             */
            _delete(file) {
                console.log('delete', file);
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
        background:#fefff9;
        border: 1px solid $bg_ddcdaf;
        color: $color;
    }
    .registered {
        background: $bgc-theme;
        &_head {
            position: relative;
            &_upLoadImg {
                position: absolute;
                left: calc(50% - 100px);
                top: 24px;
                width: 200px;
                height: 200px;
                margin: 50px auto;
                border-radius: 50%;
                z-index: $head-z-index;
            }
            &_box {
                width: 200px;
                height: 200px;
                border: 2px solid $bg_ddcdaf;
                border-radius: 50%;
                margin: 50px auto;
                background: $bgColor;
                position: relative;
                &:after {
                    content: '';
                    position: absolute;
                    left: 30%;
                    top: calc(50% - 1px);
                    height: 2px;
                    width: 40%;
                    background: $bg_ddcdaf;
                }
                &:before {
                    content: '';
                    position: absolute;
                    left: calc(50% - 1px);
                    top: 30%;
                    width: 2px;
                    height: 40%;
                    background: $bg_ddcdaf;
                }
            }
            &_txt {
                text-align: center;
                color: $bg_ddcdaf;
            }
        }
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
        &_agreement {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 15vh;
        }
    }
    .isOpacity{
        opacity: 0;
    }
</style>
