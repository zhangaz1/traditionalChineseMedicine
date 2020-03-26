<template>
    <div class="contactUs ptb108">
        <van-nav-bar
                class="contactUs_title"
                title="联系客服"
                left-arrow
                @click-left="onGoBack"
                fixed
        />
        <div class="contactUs_content plr30 ptb40">
            <div class="contactUs_content_tips">请您通过长按下列二维码保存到手机，微信识别联系我们，或通过邮箱等。</div>
            <div class="contactUs_content_code">
                <!--在这里插入内容-->
                <div id="qrcode" ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'contactUs',
        data() {
            return {
                codeUrl: 'https://baidu.com', // 二维码
            };
        },
        components: {
            QRCode
        },
        mounted() {
            this.$nextTick (function () {
                this.qrcode();
            });
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            /** 2020/3/22
             * 作者：王青高
             * 功能：{} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
            },
            //  生成二维码
            qrcode () {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 124,
                    height: 124, // 高度
                    text:  this.codeUrl, // 二维码内容
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                });
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
    .van-nav-bar {
        line-height: 108px;
    }
    .contactUs {
        position: relative;
        &_title {
            height: 108px;
        }
        &_content {
            background: $bgColor;
            height: 100vh;
            box-sizing: border-box;
            &_tips {
                font-size: 32px;
                line-height: 40px;
                color: $color_cbb488;
            }
            &_code {
                @include flex-center();
                width: 100%;
                height: 500px;
            }
        }
    }
</style>
