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
            <div class="contactUs_content_tips">请您通过长按下列二维码保存到手机，微信识别联系我们，或通过邮箱等</div>
            <div class="contactUs_content_code" @touchstart="gtouchstart($event)" @touchend="gtouchend($event)" @touchmove="gtouchmove()">
                <!--在这里插入内容-->
                <div id="qrcode" ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import html2canvas from 'html2canvas';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'contactUs',
        data() {
            return {
                codeUrl: 'https://baidu.com', // 二维码
                timer: 0, // 计时器
            };
        },
        mounted() {
            this.$nextTick(function () {
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
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 生成二维码
             * 参数：{}
             */
            qrcode() {
                let that = this;
                let qrcode = new QRCode('qrcode', {
                    width: 124,
                    height: 124, // 高度
                    text:  this.codeUrl, // 二维码内容
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                });
            },
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 长按复制二维码
            * 参数：{}
            */
            gtouchstart(event) {
                let self = this;
                this.timer = setTimeout(function () {
                    self._copy();
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
                if (this.timer !== 0){
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
                var canvas2 = document.createElement('canvas');
                let _canvas = document.querySelector('.contactUs_content_code');
                var w = parseInt(window.getComputedStyle(_canvas).width);
                var h = parseInt(window.getComputedStyle(_canvas).height);
                // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
                canvas2.width = w * 2;
                canvas2.height = h * 2;
                canvas2.style.width = w + 'px';
                canvas2.style.height = h + 'px';
                // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
                var context = canvas2.getContext('2d');
                context.scale(2, 2);
                html2canvas(document.querySelector('#qrcode')).then(canvas => {
                    let imgUrl = canvas.toDataURL('image/png');
                    this.dataURL = imgUrl;
                    var a = document.createElement('a'); // 生成一个a元素
                    var event = new MouseEvent('click'); // 创建一个单击事件
                    a.download = name || 'photo'; // 设置图片名称
                    a.href = this.dataURL; // 将生成的URL设置为a.href属性
                    a.download = 'pic';
                    a.dispatchEvent(event); // 触发a的单击事件
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
            user-select: auto !important;
            &_tips {
                font-size: 32px;
                line-height: 40px;
                color: $color_cbb488;
            }
            &_code {
                @include flex-center();
                width: $size;
                height: 500px;
                user-select: auto !important;
            }
        }
    }
</style>
