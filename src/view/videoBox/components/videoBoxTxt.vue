<template>
    <div class="videoBoxTxt pb100" v-if="vedio">
        <van-sticky>
            <div class="videoBoxTxt_sticky">
                <van-nav-bar
                        :title="vedio.title"
                        left-arrow
                        @click-left="onGoBack"
                        class="videoBoxTxt_title"
                >
<!--                                            right-text="..."-->
<!--                    <template #right>-->
<!--                        <van-icon name="ellipsis" @click="onClickRight"/>-->
<!--                    </template>-->
                </van-nav-bar>
            </div>
        </van-sticky>
        <div class="videoBoxTxt_content ptb20 plr30">
            <div class="videoBoxTxt_content_title mtb50">{{vedio.title}}</div>
            <div class="videoBoxTxt_content_video">
                <video-player
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                        @player="onPlayerPlay($event)"
                        @ended="onPlayerEnded($event)"
                />
            </div>
            <div class="videoBoxTxt_content_meta">
<!--                <p class="logo">-->
<!--                    <img src="https://www.zk120.com/media/accounts/images/portraits/2018/03/673639e9ec6de4a2c3d9a4d96e96aebd.jpg" class="avatar" width="36" height="36">-->
<!--                </p>-->
                <div class="right ptb10">
                    <p class="author ptb10">
                        {{vedio.description}}
                    </p>
                    <p class="time ptb10">
                        {{vedio.createtime}}<span class="weizhi-read readwz pl10">阅读量 {{vedio.readnum}}</span>
                    </p>
                </div>
            </div>
<!--            <div class="videoBoxTxt_content_btn plr30 ptb20">-->
<!--                <button type="button" class="prev plr20 ptb10" @click="getPrev">上一集</button>-->
<!--                <button type="button" class="next plr20 ptb10" @click="getNext">下一集</button>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import { getVedioContent } from '@/api/content';
    export default {
        name: 'videoBoxTxt',
        data() {
            return {
                isShow: false, // 默认不显示菜单
                // videlUrl: '',
                // 视频播放
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
                        type: 'video/mp4',
                        // type: 'video/3gp',
                        src: ''// url地址
                    } ],
                    poster: '', // 你的封面地址
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
                nextid: 1, // 下一集视频id
            };
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'init'
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 初始化视频
            * 参数：{}
            */
            init() {
                let id = this.$route.query.id;
                if (id) {
                    this.getVedioContent(id);
                } else {
                    this.$router.push('/videoBox');
                }
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 获取视频播放内容
            * 参数：{}
            */
            getVedioContent(id) {
                getVedioContent({ id }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.vedio = result.vedio;
                        this.nextid = result.nextid;
                        this.$set(this.playerOptions.sources[0], 'src', result.vedio.url);
                    }
                });
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.push({ path: '/videoBox/components/videoBoxDetail', query: { id: this.vedio.vedioid } });
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: 点击右上角菜单
             *参数:
             */
            onClickRight() {
                this.$router.push('/footPrint');
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch() {
                console.log('点击了搜索');
            },
            /** 2020/3/24
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            getPrev() {
                console.log('获取上一集');
            },
            /** 2020/3/24
             * 作者：王青高
             * 功能：{}
             * 参数：{}
             */
            getNext() {
                console.log('获取下一集');
            },
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 切换到下一集
            * 参数：{}
            */
            onPlayerEnded(event) {
                this.$router.push({ path: '/videoBox/components/videoBoxTxt', query: { id: this.nextid } });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar__right {
        font-size: 48px;
        padding-bottom: 10px;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .van-nav-bar__text,
    .van-nav-bar .van-icon {
        color: $coloe_3;
        font-size: 48px;
    }
    /* 设置导航栏背景图 */
    .van-nav-bar__title {
        color: $color;
    }
    .videoBoxTxt {
        position: relative;
        &_sticky {
            background: #f3f2eb;
            position: relative;

            &_nav {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 80px;
                background: $bgc-theme;

                .li {
                    font-size: 28px;
                    color: $coloe_3;
                }
            }
        }
        &_title {
            height: 108px;

            &_dropDown {
                position: absolute;
                right: 20px;
                top: 100px;
                background: $bgc-theme;
                width: 300px;
                z-index: $dropDown;
                box-shadow: 0 -2px 16px 2px rgba(102, 102, 102, 0.2);
                border-radius: 12px;

                &::after {
                    content: "";
                    position: absolute;
                    right: 10px;
                    top: -20px;
                    border-color: $bgc-theme transparent;
                    border-width: 0 28px 20px 28px;
                    border-style: solid;
                    width: 0;
                    height: 0;
                }

                &_item {
                    height: 100px;
                    line-height: 100px;
                    position: relative;

                    .van-icon {
                        position: absolute;
                        left: 30px;
                        top: 30px;
                        font-size: 48px;
                    }

                    .txt {
                        display: block;
                        font-size: 28px;
                        color: $coloe_3;
                        text-align: left;
                        border-bottom: 1px solid #f2f2f2;
                    }
                }
            }
        }
        &_content {
            background: $bgc-theme;
            &_title {
                @include multiline-ellipsis(2);
                font-size: 44px;
                color: $coloe_3;
                font-weight: 700;
            }
            &_meta {
                position: relative;
                .logo {
                    position: absolute;
                    left: 0;
                    top: 20px;
                    width: 72px;
                    height: 72px;
                }
                .right {

                    .author {
                        color: $coloe_3;
                        font-size: 26px;
                        font-weight: 700;
                    }
                    .time {
                        color: $color_999;
                        font-size: 24px;
                        text-align: right;
                    }
                }
            }
            &_video {
                width: 100%;
                height: 100%;
                margin: 0 auto;
            }
            &_btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .next,
                .prev {
                    border: 1px solid $coloe_3;
                    color: $color-default;
                    border-radius: 10px;
                }

            }
        }

    }
</style>
