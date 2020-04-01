<template>
    <div class="userInfo ptb108">
        <van-nav-bar :title="title" left-arrow @click-left="onGoBack" fixed class="videoBox_title"/>
        <ul class="me_vip mb20">
            <li class="me_vip_li ptb20 plr30 mb20">
                <span class="txt">更换头像</span>
                <van-uploader
                        :max-count="1"
                        @delete="_delete"
                        :before-read="beforeRead"
                        :after-read="afterRead"
                        v-model="headImg"
                        class="upLoadImg mr20"/>
            </li>
            <router-link tag="li" :to="{ path: '/changeUserName', query: { title: nickname } }" class="me_vip_li ptb20 plr30 mb20">
                <span class="txt">姓名</span>
                <span class="txt mr20">{{nickname}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import axios from 'axios';
    import { getUserInfo, updateInfo } from '@/api/login';
    export default {
        name: 'userInfo',
        data() {
            return {
                title: '个人资料',
                headImgUrl: '', // 头像图片
                headImg: [], // 存储图片
                isTrue: false, // 是否隐藏
                userInfo: '', // 用户信息
                nickname: '' // 昵称
            };
        },
        mounted() {
            this.getUserInfo();
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
                        this.headImg.push({ url: result.userinfo.headimg });
                        this.nickname = result.userinfo.nickname;
                    }
                });
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
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
                        this.updateInfo();
                        this.isTrue = true;
                    } else {
                        Toast('上传失败');
                    }
                });
            },
            updateInfo() {
                updateInfo({
                    headimgurl: this.headImgUrl
                }).then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        if (result.imgurl) this.headImg.push({ url: result.imgurl });
                        Toast(res.msg);
                    }
                });
            },
            _delete() {
                console.log('点击了删除');
            }
        }
    };
</script>
<style>
    .upLoadImg .van-uploader__preview,
    .upLoadImg .van-uploader__file,
    .upLoadImg .van-uploader__preview-image,
    .upLoadImg .van-uploader__upload {
        width: 80px;
        height: 80px;
        margin: 0;
    }
    .upLoadImg .van-uploader__preview-delete {
        top: calc(50% - 50px);
        left: calc(50% - 50px);
        font-size: 100px;
        opacity: 0;
    }
</style>
<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar .van-nav-bar__arrow {
        font-size: 0.48rem;
        color: #333;
    }
    .me {
        &_vip {
            &_li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                min-height: 60px;
                background: $bgc-theme;
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
    }
</style>
