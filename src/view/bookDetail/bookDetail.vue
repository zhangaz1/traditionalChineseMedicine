<template>
    <div class="bookDetail plr30 ptb20">
        <div class="bookDetail_book" @click="openIsSetting">
            <div class="bookDetail_book_title">中草药标题</div>
            <div class="bookDetail_book_article">
                （集注）王肯堂曰：但有一毫头痛恶寒，即为表证未解，不可下也。
                程应旄曰：若下后外证未解者，仍当解外，有的证用是药，不可以既下而遂谓桂枝汤不中与也。
                汪琥曰：下之为逆；
                逆者，为病在外而反攻其内，于治法为不顺也。
                太阳病，先发汗不解，而复下之，脉浮者不愈。
                浮为在外，而反下之，故令不愈。
                今脉浮，故知在外，当须解外则愈，宜桂枝汤。
                （注）太阳病，先发汗表未解，仍宜汗之，而复下之，治失其宜矣。
                脉浮者不愈，
            </div>
            <div class="bookDetail_book_adv">
                <video-player
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                />
            </div>
            <div class="bookDetail_book_jump mtb50">
                <div class="prev plr30 ptb20" @click="prev">上一章</div>
                <div class="next plr30 ptb20" @click="next">下一章</div>
            </div>
        </div>
        <div class="bookDetail_menu">
            <div class="menu ptb10 plr10" @click="openMenu">菜 单</div>
        </div>
        <div class="bookDetail_back" :class="{back: isMenu}">
            <van-icon name="arrow-left" class="left" @click="arrowLeft"/>
            <div class="title">{{articleTitle}}</div>
        </div>
        <div class="bookDetail_footer ptb10" :class="{footer: isMenu}">
            <div class="bookDetail_footer_nav" @click="directory"><van-icon name="bars" class="icon mb20"/><span class="txt">目录</span></div>
            <div class="bookDetail_footer_nav" @click="addTag"><van-icon name="bookmark-o" class="icon mb20"/><span class="txt">书签</span></div>
            <div class="bookDetail_footer_nav" @click="isSetting = !isSetting"><van-icon name="setting-o" class="icon mb20"/><span class="txt">设置</span></div>
        </div>
        <div class="bookDetail_settingBox" :class="{setting: isSetting}">
            <van-cell center title="夜间模式">
                <template #right-icon>
                    <van-switch v-model="isNight" size="24" />
                </template>
            </van-cell>
            <div class="bookDetail_settingBox_size">
                <div class="minus">A-</div>
                <div class="nowSize">12</div>
                <div class="add">A+</div>
            </div>
            <ul class="bookDetail_settingBox_bgColor">
                <li class="bgColor" v-for="(bg, index) of bookDetailConfig" :key="'bg' + index" :style="'backgroundColor: ' + bg"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { EventBus } from "@/utils/event-bus";
    import { bookDetailConfig } from './config';
    export default {
        name: 'bookDetail',
        data() {
            return {
                playerOptions: {
                    playbackRates: [ 0.5, 1.0, 1.5, 2.0 ], // 可选择的播放速度
                    autoplay: true, // 如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop : false, // 视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [ {
                        // type: 'video/mp4',
                        // type: 'video/ogg',
                        // type: 'video/webm',
                        type: 'video/webm',
                        // type: 'video/3gp',
                        src: ''// url地址
                    } ],
                    poster: require('../../assets/image/0001.jpg'), // 你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true, // 当前时间和持续时间的分隔符
                        durationDisplay: true, // 显示持续时间
                        remainingTimeDisplay: false, // 是否显示剩余时间功能
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                vedio: null, // 视频内容
                isMenu: false, // 默认关闭菜单
                articleTitle: '标题',
                isNight: false, // 是否夜间模式
                isSetting: false, // 点击显示设置
                bookDetailConfig
            };
        },
        mounted() {
            let id = this.$route.query.id;
            if (id) {
                this.getVedioContent(id);
            } else {
                this.$router.push('/book');
            }
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            openIsSetting() {
                if (this.isSetting) this.isSetting = false;
            },
            /** 2020/3/26
             * 作者：王青高
             * 功能：{} 获取视频播放内容
             * 参数：{}
             */
            getVedioContent(id) {
                // getVedioContent({ id }).then(res => {
                //     let result = res.data;
                //     if (res.state === '1') {
                //         this.vedio = result.vedio;
                //         this.$set(this.playerOptions.sources[0], 'src', result.vedio.url);
                //     }
                // });
            },
            /** `2020/3/27`
            * 作者：王青高
            * 功能：{} 跳转上一章
            * 参数：{}
            */
            prev() {

            },
            /** `2020/3/27`
             * 作者：王青高
             * 功能：{} 跳转下一章
             * 参数：{}
             */
            next() {

            },
            /** 2020/3/27
            * 作者：王青高
            * 功能：{} 打卡菜单
            * 参数：{}
            */
            openMenu() {
                if (this.isMenu) {
                    this.isMenu = false;
                } else {
                    this.isMenu = true;
                }
            },
            /** 2020/3/27
            * 作者：王青高
            * 功能：{} 返回上一页
            * 参数：{}
            */
            arrowLeft() {
                this.$router.go(-1);
            },
            /** 2020/3/27
            * 作者：王青高
            * 功能：{} 添加书签
            * 参数：{}
            */
            addTag() {
                console.log('添加书签');
            },
            /** 2020/3/27
            * 作者：王青高
            * 功能：{} 目录
            * 参数：{}
            */
            directory() {
                console.log('目录');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .bookDetail {
        background: $bgColor;
        position: relative;
        &_book {
            position: relative;
            &_title {
                height: 40px;
                font-size: 28px;
                color: $color_999;
            }
            &_article {
                color: $coloe_3;
                line-height: 2;
                font-size: 30px;
                text-indent: 50px;
                overflow-y: scroll;
                height: 60vh;
            }
            &_jump {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;
                .next,
                .prev {
                    border-radius: 20px;
                    background: $bg_ddcdaf;
                    font-size: 32px;
                }
            }
        }
        &_menu {
            position: fixed;
            top: 100px;
            right: 0;
            transition: all .5s;
            .menu {
                font-size: 28px;
                background: #eb6350;
                border-radius: 15px 0 0 15px;
                color: $color-default;
            }
        }
        &_back {
            position: fixed;
            left: 0;
            top: -100px;
            width: 100%;
            height: 100px;
            background: $bgc-theme;
            box-shadow: 0 3px 10px rgba(3, 3, 3, 0.1);
            transition: all .5s;
            opacity: 0;
            .left {
                position: absolute;
                left: 30px;
                top: calc(50% - 30px);
                font-size: 60px;
                color: $color_666;
            }
            .title {
                @include flex-center();
                width: 100%;
                height: 100%;
            }
            &:after {
                /*content: '';*/
                position: absolute;
                left: 10px;
                top: calc(50% - 7px);
                width: 14px;
                height: 14px;
                border-top: 8px solid #ccc;
                border-right: 8px solid #ccc;
                transform: rotate(-135deg);
            }
        }
        &_footer {
            position: fixed;
            left: 0;
            bottom: -100px;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 3px 10px rgba(3, 3, 3, 0.1);
            z-index: $navbar-z-index;
            background: $color-default;
            opacity: 0;
            transition: all .5s;
            &_nav {
                @include flex-center(column);
                .icon {
                    font-size: 48px;
                    color: $color_666;
                }
                .txt {
                    color: $color_666;
                    font-size: 28px;
                }
            }
        }
        &_settingBox {
            position: fixed;
            left: 0;
            bottom: -300px;
            width: 100%;
            height: 300px;
            box-shadow: 0 3px 10px rgba(3, 3, 3, 0.1);
            z-index: $navbar-z-index;
            background: $color-default;
            opacity: 0;
            transition: all .5s;
        }
    }
    .back {
        top: 0;
        opacity: 1;
    }
    .footer {
        bottom: 0;
        opacity: 1;
    }
    .setting {
        bottom: 0;
        opacity: 1;
    }
</style>
