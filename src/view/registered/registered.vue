<template>
    <div class="registered pt120">
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
                        type="tel"
                        v-model="phone"
                        name="phone"
                        placeholder="手机号"
                        :rules="[{ validator, message: '请输入正确格式的手机号' }]"
                        class="validator"
                        maxlength="11"
                        :disabled="false"
                />
                <van-field v-model="nickname" maxlength="6" name="nickname" placeholder="昵称" class="validator" :rules="[{ required: true, message: '请填写昵称' }]" />
                <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        class="validator"
                        :disabled="false"
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
                我已经阅读，并同意《 <span class="agreement" @click.stop="getAgreement">用户协议</span> 》
            </van-checkbox>
        </div>
        <div class="registered_img" v-if="isImg">
            <img src="http://www.rkswzx.cn/routing/userimg/20180426/20180426164140_427.jpg" alt="" class="img">
        </div>
        <div class="mask" v-if="isImg"  @click="isImg = !isImg">
            <van-icon name="close" class="mb40" @click.stop="isImg = !isImg" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import { Toast } from 'vant';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'registered',
        data() {
            return {
                phone: '',
                password: '',
                nickname: '',
                checked: true, // 是否勾选协议
                headImg: [],
                isTrue: true, // 是否隐藏
                headImgUrl: '', // 存储图片地址.
                isImg: false // 是否显示协议
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
                this.$router.push('/login');
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 表单提交-登陆账号
             * 参数：{}
             */
            onSubmit(values) {
                if (!this.validator(this.phone) || !this.password || !this.nickname) {
                    Toast('请输入完整信息');
                    return;
                }
                // 注册手机
                const tips1 = Toast('正在登录中...');
                axios.post('/login/registByPhone', qs.stringify({
                    phone: values.phone,
                    password: values.password,
                    nickname: values.nickname,
                    headimgurl: this.headImgUrl
                })).then(res => {
                    let data = res.data;
                    if (res.data.state === '1') {
                        tips1.clear();
                        this.login(values);
                    } else {
                        Toast(data.msg);
                    }
                }).catch(err => {
                    Toast('系统错误', err);
                });
            },
            login(userInfo) {
                axios.post('/login/normallogin', qs.stringify({
                    phone: userInfo.phone,
                    password: userInfo.password
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
                if (!this.isImg) this.isImg = true;
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
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    Toast('请上传 jpg、png 格式图片');
                    return false;
                }
                return true;
            },
            /** 2020-3-21 0021
             *作者:王青高
             *功能: 头像上传
             *参数:
             */
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                let param = new FormData(); // 创建form对象
                param.append('file', file.file);
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                axios.post('/imgupload/upfile', param, config).then(res => {
                    if (res.data.state === '1') {
                        let result = res.data;
                        this.headImgUrl = result.data.imgurl;
                        Toast('上传成功');
                        this.isTrue = false;
                    } else {
                        Toast('上传失败');
                    }
                });
            },
            /** 2020-3-21 0021
             *作者: 王青高
             *功能: 删除图片
             *参数:
             */
            _delete(file) {
                console.log('delete', file);
            }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    input {
        user-select: text;
        -webkit-user-select: text; //部分浏览器已经不适用
    }
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
        height: 91vh;
        position: relative;
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
            @include flex-center();
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        &_img {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 90%;
            height: 80%;
            overflow-y: scroll;
            z-index: 99;
            .img {
                width: 100%;
            }
        }
    }
    .isOpacity{
        opacity: 0;
    }
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .van-loading__text {
        color: #fff;
    }
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(3, 3, 3, .2);
        z-index: 9;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .van-icon-close {
            font-size: 100px;
        }
    }
    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .validator {
        border-bottom: 1px solid $ccc-color;
    }
</style>
