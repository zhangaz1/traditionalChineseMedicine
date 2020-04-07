<template>
    <div class="bookDetail plr30 ptb20"
         ref="bookDetail"
         :class="{isNight: isNight, turnBook: isTurnBook}"
         :style="{backgroundColor: bookDetailConfig[current]}">
        <div class="bookDetail_book">
            <div class="bookDetail_book_title">{{bookitem.title}}</div>
            <div class="bookDetail_book_voice ptb20" @click="openVoice($event)">
                <van-icon :name="voiceData" class="voiceIcon mr20" />语音播报
                <audio src="" ref="audios" @ended="audioGoOn"></audio>
            </div>
            <ul class="bookBox" ref="book" :class="{isHeight: !adv}" @scroll.stop="getPull($event)">
                <li class="bookDetail_book_pullArticle ptb20" @click.stop="getFirst">点击获取上一章<van-icon name="arrow-up" class="ml20" /></li>
                <li class="bookDetail_book_article"
                     ref="article"
                     :class="{isNight: isNight}"
                     :style="[{ color: bookDetailColorConfig[current] }, { fontSize: fontConfig.size + 'px'}]" v-html="article">
                </li>
                <li class="bookDetail_book_pullArticle">上拉获取下一章<van-icon name="arrow-down" class="ml20" /></li>
                <!--  @touchmove.stop="turnPage($event)"
                      @touchstart.stop="startTurnPage($event)" -->
            </ul>
            <!-- <div class="bookDetail_book_percent ptb10">0.0%</div> -->
            <div class="bookDetail_book_adv" v-if="adv">
                <video-player
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                />
            </div>
<!--            <div class="bookDetail_book_jump mtb20">-->
<!--                <div class="prev plr30 ptb10" @click="prev()">上一页</div>-->
<!--                <div class="next plr30 ptb10" @click="next()">下一页</div>-->
<!--            </div>-->
        </div>
        <div class="bookDetail_menu">
            <div class="menu ptb10 plr10" @click="openMenu($event)">{{menuTitle}}</div>
        </div>
        <div class="bookDetail_back" :class="{back: isMenu, _isNight: isNight}">
            <van-icon name="arrow-left" class="left" @click.stop="arrowLeft($event)"/>
            <van-icon :name="bookmark" class="right" @click.stop="addTag($event)"/>
        </div>
        <div class="bookDetail_footer ptb10" :class="{footer: isMenu, _isNight: isNight}">
            <div class="bookDetail_footer_nav" @click.stop="arrowLeft($event)"><img :src="require('../../assets/img/back.png')" class="icon mb20 iconImg" alt=""><span class="txt">返回</span></div>
            <div class="bookDetail_footer_nav" @click.stop="directory(0, $event)"><van-icon name="bars" class="icon mb20"/><span class="txt">目录</span></div>
            <!--            <div class="bookDetail_footer_nav" @click="directory(1, $event)"><van-icon name="bookmark-o" class="icon mb20"/><span class="txt">书签</span></div>-->
            <div class="bookDetail_footer_nav" @click.stop="isSetting = !isSetting"><van-icon name="setting-o" class="icon mb20"/><span class="txt">设置</span></div>
        </div>
        <div class="bookDetail_settingBox" :class="{setting: isSetting, _isNight: isNight}">
            <van-cell center title="夜间模式" :class="{_isNight: isNight}">
                <template #right-icon>
                    <van-switch v-model="isNight" size="18" active-color="#07c160" inactive-color="#eee"/>
                </template>
            </van-cell>
            <ul class="bookDetail_settingBox_bgColor ptb20">
                <li class="bgColor"
                    v-for="(bg, index) of bookDetailConfig"
                    :key="'bg' + index"
                    :style="'backgroundColor: ' + bg"
                    :class="{bgActived: current === index}"
                    @click.stop="changeBg(bg, index, $event)"></li>
            </ul>
        </div>
        <div class="bookDetail_directory" :class="{directory: isDirectory}">
            <van-sticky  v-show="isDirectory">
                <van-nav-bar
                        :title="title"
                        left-arrow
                        @click-left="onGoBack($event)"
                />
                <ul class="ul">
                    <li class="li ptb30"
                        @click.stop="switchTab(item, index)"
                        v-for="(item, index) of navItem"
                        :key="'item' + index"
                        :class="{isDirectory: curDirectory === index}">{{item}}</li>
                </ul>
            </van-sticky>
            <div class="bookDetail_directory_list">
                <ul class="_one" v-if="curDirectory === 0">
                    <li class="_one_li" @click.stop="openBook(dir)" v-for="(dir, index) of directoryData.bookitem" :key="'idr' + index" >{{dir.title}}</li>
                </ul>
                <ul class="bookmark" v-else>
                    <li class="li plr30 ptb20" @click.stop="getBookMark(mark, $event)" v-for="(mark, index) of bookmarkData" :key="'mark' + index">
                        <p class="title mb20">{{mark.title}}</p>
                        <p class="txt">{{mark.txt}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bookDetail_help" @click.stop="alertHelp" v-if="closeHelp">
            <div class="left">
                <img :src="require('../../assets/img/left_help.png')" alt="" class="img">
            </div>
            <div class="center">
                <img :src="require('../../assets/img/center_help.png')" alt="" class="img">
            </div>
            <div class="right">
                <img :src="require('../../assets/img/right_help.png')" alt="" class="img">
            </div>
        </div>
    </div>
</template>

<script>
    import { EventBus } from "@/utils/event-bus";
    import { bookDetailConfig, bookDetailColorConfig, navItem } from './config';
    import { getItemContent, getBookItem, addtobookshelf } from '@/api/content';
    import { Toast } from 'vant';
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
                isDirectory: false, // 是否显示目录
                bookDetailConfig,
                bookDetailColorConfig,
                current: 0, // 当前索引
                curDirectory: 0, // 目录菜单索引
                fontConfig: {
                    size: 18, // 字体大小
                    isFontMinus: false, // 递减是否开启
                    isFontAdd: false // 递增是否开启
                },
                menuTitle: '菜单',
                touchConfig: {
                    timer: null, // 计时器
                    startPageX: 0, // 开始触摸位置
                    endPageX: 0, // 结束触摸位置
                    startPageY: 0, // 开始触摸位置
                    endPageY: 0 // 结束触摸位置
                },
                navItem,
                bookmarkData: [],
                voiceData: 'volume-o',
                isTurnBook: false, //  启动翻书特效
                adv: false, // 是否有广告
                articleData: [], // 存储一张内容数据
                articleLen: 500, // 限制语音播报文字的长度
                articleVar: 0, // 初始化播报文字开始
                audioUrl: 'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=',
                article: '',
                Index_: 0, // 初始化页数
                bookitem: {}, // 书籍内容
                directoryData: [], // 存储目录内容
                title: '', // 标题
                prev_: '', // 上一章
                next_: '', // 下一章
                initStatus: 0, // 初始化状态
                closeHelp: true, // 是否弹出帮助框
                curId: '', // 当前小说id
                lastPage: '', // 存储当前页数
                bookmark: 'bookmark-o',
                timer: null, // 计时器
            };
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'init'
        },
        updated() {
            /** 2020/3/31
             * 作者：王青高
             * 功能：{text} article: 由于初始化渲染为空所以执行两次进行补充渲染
             * 参数：{}
             */
            // if (this.initStatus < 2) {
            //     this.$nextTick(function () {
            //         this.initPage(this.article);
            //     });
            //     this.initStatus++;
            // } else {
            //     localStorage.removeItem('pagePrev');
            //     return;
            // }
        },
        mounted() {
            this.init();
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            /** 2020/3/31
             * 作者：王青高
             * 功能：{} 弹出帮助指南
             * 参数：{}
             */
            alertHelp() {
                this.closeHelp = false;
                localStorage.setItem('Help', this.closeHelp);
            },
            /** 2020/3/31
             * 作者：王青高
             * 功能：{} 打开指定目录
             * 参数：{}
             */
            openBook(book) {
                this.isDirectory = false;
                this.$router.push({ path: '/bookDetail', query: { id: book.id } });
            },
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 初始化数据
             * 参数：{}
             */
            init() {
                if (this.$route.query.id) {
                    this.curId = this.$route.query.id;
                }
                if (this.curId) {
                    this.getItemContent(this.curId);
                    if (localStorage.getItem('Help')) {
                        this.closeHelp = false;
                        return;
                    }
                } else {
                    this.$router.push('/book');
                }
            },
            /** 2020-3-29 0029
             *作者: 王青高
             *功能: 给音频赋值
             *参数:
             */
            initAudio() {
                if (!this.article) this.$router.push({ path: '/bookContentFeed', id: this.curId });
                this.$refs.audios.src = this.audioUrl + encodeURI(this.article.substring(0, this.articleLen));
                this.articleVar = this.articleLen;
            },
            /** 2020-3-29 0029
             *作者: 王青高
             *功能: 如果文字过长 分段阅读
             *参数:
             */
            audioGoOn() {
                if (this.articleLen < this.article.length) {
                    this.$refs.audios.src = this.audioUrl + encodeURI(this.article.substring(this.articleVar, (this.articleLen + this.articleVar)));
                    this.articleVar = (this.articleVar + this.articleLen);
                    this.$refs.audios.play();
                }
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 切换目录和书签菜单
             *参数:
             */
            switchTab(item, index) {
                this.curDirectory = index;
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 打开设置菜单
             *参数:
             */
            openIsSetting() {
                if (this.isSetting) {
                    this.isSetting = false;
                    this.isMenu = false;
                    this.menuTitle = '菜单';
                }
            },
            /** 2020/3/26
             * 作者：王青高
             * 功能：{} 获取小说内容, 如果本地有记录章节，并获取章节索引，否则初始化索引
             * 参数：{String} 小说id
             */
            getItemContent(id) {
                getItemContent({ id }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.bookitem = result.bookitem;
                        this.article = this.bookitem.content;
                        this.article = this.article.replace(/<[^>]+>/g, ''); // 去除html标签
                        this.next_ = result.nextid;
                        this.prev_ = result.preid;
                        this.$refs.book.scrollTop = 0;
                        this.initAudio();
                        if (this.voiceData === 'volume') this.voiceData = 'volume-o';
                        // document.documentElement.scrollTop = 0;
                        // if (localStorage.getItem('curPagebook' + id)) {
                        //     this.Index_ = localStorage.getItem('curPagebook' + id);
                        // } else {
                        //     localStorage.setItem('curPagebook' + id, this.Index_);
                        // }
                    }
                });
            },
            /** `2020/3/27`
             * 作者：王青高
             * 功能：{} 跳转上一章
             * 参数：{}
             */
            prev() {
                if (this.Index_ != 0) {
                    let i = --this.Index_;
                    if (this.Index_ >= 0) {
                        this.$nextTick(() => {
                            this.article = this.articleData[i];
                            this.initAudio();
                            this.voiceData = 'volume-o';
                        });
                    } else {
                        this.Index_ = 0;
                    }
                    localStorage.setItem('curPagebook' + this.curId, i);
                } else {
                    if (this.prev_ != '') {
                        localStorage.removeItem('curPagebook' + this.curId);
                        localStorage.setItem('pagePrev', 1);
                        this.Index_ = 0;
                        this.articleData = []; // 初始化当前页面内容
                        this.initStatus = 0; // 改变初始化状态;
                        this.$router.push({ path: '/bookDetail', query: { id: this.prev_ } });
                    } else {
                        Toast('已经是第一页');
                        return;
                    }
                }
            },
            /** `2020/3/27`
             * 作者：王青高
             * 功能：{} 跳转下一章
             * 参数：{}
             */
            next() {
                let i = ++this.Index_;
                localStorage.removeItem('pagePrev');
                if (this.Index_ < this.articleData.length) {
                    this.$nextTick(() => {
                        this.article = this.articleData[i];
                        this.initAudio();
                        this.voiceData = 'volume-o';
                    });
                    localStorage.setItem('curPagebook' + this.curId, i);
                } else {
                    if (this.next_ != '') {
                        this.Index_ = 0;
                        localStorage.removeItem('curPagebook' + this.curId);
                        this.articleData = []; // 初始化当前页面内容
                        this.initStatus = 0; // 改变初始化状态;
                        this.$router.push({ path: '/bookDetail', query: { id: this.next_ } });
                    } else {
                        this.Index_ = this.articleData.length - 1;
                        Toast('已经是最后一页');
                        return;
                    }
                }
            },
            /** 2020/3/27
             * 作者：王青高
             * 功能：{} 打卡菜单
             * 参数：{}
             */
            openMenu() {
                if (this.isMenu) {
                    this.isMenu = false;
                    this.isSetting = false;
                    this.menuTitle = '菜单';
                } else {
                    this.isMenu = true;
                    this.menuTitle = '撤销菜单';
                }
            },
            /** 2020/3/27
             * 作者：王青高
             * 功能：{} 返回上一页
             * 参数：{}
             */
            arrowLeft(event) {
                event.preventDefault();
                if (this.bookitem && this.bookitem.bookid) {
                    this.$router.push({ path: '/bookContentFeed', query: { id: this.bookitem.bookid } });
                } else {
                    this.$router.go(-1);
                }
            },
            /** 2020/3/27
             * 作者：王青高
             * 功能：{} 添加书签
             * 参数：{}
             */
            addTag(event) {
                let bookitemid = this.curId;
                if (this.bookmark === 'bookmark-o') {
                    addtobookshelf({ bookitemid }).then(res => {
                        if (res.state === '1') {
                            Toast(res.msg);
                            this.bookmark = 'bookmark';
                        }
                    });
                } else {
                    Toast('已经添加到书架了！');
                    return;
                }
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 撤回
             * 参数：{}
             */
            onGoBack(event) {
                event.preventDefault();
                this.isDirectory = false;
            },
            /** 2020/3/27
             * 作者：王青高
             * 功能：{} 目录
             * 参数：{String} index: 目录和书签当前
             */
            directory(index, event) {
                event.preventDefault();
                document.documentElement.scrollTop = 0;
                this.isDirectory = true;
                this.isMenu = false;
                this.menuTitle = '菜单';
                this.curDirectory = index;
                this.getBookItem(this.bookitem.bookid);
            },
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 获取目录
             * 参数：{String} 书籍id
             */
            getBookItem(id) {
                getBookItem({ id }).then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        this.directoryData = result;
                        this.title = this.directoryData.book.title;
                    }
                });
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 切换背景色
             *参数:
             */
            changeBg(color, index, event) {
                event.preventDefault();
                this.current = index;
            },
            /** 2020-3-29 0029
             *作者: 王青高
             *功能: 字体递减
             *参数:
             */
            minus(event) {
                event.preventDefault();
                this.fontConfig.size -= 6;
                if (this.fontConfig.size > 12) {
                    this.fontConfig.isFontAdd = false;
                } else {
                    this.fontConfig.isFontMinus = true;
                }
                this.initPage(this.article);
            },
            /** 2020-3-29 0029
             *作者: 王青高
             *功能: 字体递增
             *参数:
             */
            _add(event) {
                event.preventDefault();
                this.fontConfig.size += 6;
                if (this.fontConfig.size < 30) {
                    this.fontConfig.isFontMinus = false;
                } else {
                    this.fontConfig.isFontAdd = true;
                }
                this.initPage(this.article);
            },
            /** 2020-3-29 0029
             *作者: 王青高
             *功能: 翻页
             *参数:
             */
            turnPage(event) {
                event.preventDefault();
                if (this.touchConfig.timer) clearTimeout(this.touchConfig.timer);
                this.touchConfig.timer = setTimeout(() => {
                    this.touchConfig.endPageX = event.targetTouches[0].pageX;
                    this.touchConfig.endPageY = event.targetTouches[0].pageY;
                    let startX = this.touchConfig.startPageX;
                    let startY = this.touchConfig.startPageY;
                    let endX = this.touchConfig.endPageX;
                    let endY = this.touchConfig.endPageY;
                    if ((startX - endX) > 80 || (startY - endY) > 200) {
                        this.next();
                    }
                    if ((startX - endX) < -50 || (startY - endY) < -200) {
                        this.prev();
                    }
                }, 50);
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 监听开始触摸
             *参数:
             */
            startTurnPage(event) {
                event.preventDefault();
                if (this.isSetting || this.isMenu) {
                    this.openIsSetting(event);
                    return;
                }
                let clientWidth = document.body.clientWidth;
                this.touchConfig.startPageX = event.targetTouches[0].pageX;
                this.touchConfig.startPageY = event.targetTouches[0].pageY;
                if (this.touchConfig.timer) clearTimeout(this.touchConfig.timer);
                this.touchConfig.timer = setTimeout(() => {
                    let startX = this.touchConfig.startPageX;
                    let centerWidth = clientWidth / 2; // 获取中间宽度
                    if (centerWidth < startX) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }, 50);
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 跳转指定书签
             *参数: {Ojbect} 指定目录
             */
            getBookMark(obj, event) {
                event.preventDefault();
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 语音播报
             *参数:
             */
            openVoice(event) {
                event.preventDefault();
                let voiceIcon = this.voiceData;
                if (voiceIcon === 'volume-o') {
                    this.voiceData = 'volume';
                    this.$refs.audios.play();
                } else {
                    this.voiceData = 'volume-o';
                    this.$refs.audios.pause();
                }
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 初始化页面
             *参数:
             */
            initPage(writeStr) {
                if (!writeStr) return;
                writeStr = writeStr.replace(/<[^>]+>/g, ''); // 去除html标签
                let clientHeight = this.$refs.book.clientHeight; // 固定高度
                let len = writeStr.length; // 总长度
                let cH = this.$refs.article.clientHeight; // 总高度
                let pageStrNum = ''; // 每页大概有多少个字符
                if (cH > clientHeight) {
                    pageStrNum = (clientHeight / cH) * len; // 每页大概有多少个字符
                    this.articleLen = pageStrNum;
                    let page = Math.ceil(len / pageStrNum); // 分成多少页
                    this.overflowhiddenTow(writeStr, page, pageStrNum);
                    if (localStorage.getItem('pagePrev')) {
                        let len = (this.articleData.length - 1);
                        this.article = this.articleData[len];
                        this.Index_ = len;
                        localStorage.setItem('curPagebook' + this.curId, len);
                    } else {
                        this.article = this.articleData[this.Index_];
                    }
                    this.initAudio();
                } else {
                    return;
                }
            },
            /** 2020-3-29 0029
             *作者:王青高
             *功能: 文字切割算法
             *参数:
             */
            overflowhiddenTow(writeStr, page, pageStrNum) {
                for (let i = 0; i < page; i++) {
                    let j = i * pageStrNum;
                    let str = writeStr.substr(j, pageStrNum);
                    this.articleData.push(str);
                }
            },
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 获取下一章内容
            * 参数：{}
            */
            getPull(event) {
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= (scrollHeight)) {
                    console.log('触发了我');
                    if (this.timer) clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        let id = this.next_;
                        if (!this.next_) {
                            Toast('已经是最后一页了');
                            return;
                        };
                        this.getItemContent(id);
                    }, 200);
                }
            },
            /** 2020/4/7
             * 作者：王青高
             * 功能：{} 获取上一章内容
             * 参数：{}
             */
            getFirst(event) {
                let id = this.prev_;
                if (!this.prev_) {
                    Toast('已经是第一页了');
                    return;
                };
                this.getItemContent(id);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar .van-icon {
        color: $color_999;
        font-size: 60px;
    }
    .bookDetail {
        background: $bgColor;
        position: relative;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        &.turnBook {
            &:before {
                content: '';
                position: absolute;
                height: 0;
                width: 0;
                bottom: 0;
                right: 0;
                background: $bgColor;
                background: linear-gradient(225deg, $bgColor 45%, #aaaaaa 50%, #cccccc 56%, $bgColor 80%);
                box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.4);
                transition-duration: 1s;
                transition-property: width, height;
                transform: rotate(90deg);
                z-index: $turnBook-z-index;
            }
            &:hover:before {
                width: 500px;
                height: 500px;
            }
        }
        &_book {
            position: relative;
            width: 100%;
            height: 100%;
            .bookBox {
                height: 88vh; // 有视频的高度
                overflow-y: scroll;
            }
            &_title {
                height: 40px;
                font-size: 28px;
                color: $color_999;
            }
            &_voice {
                display: flex;
                align-items: center;
                font-size: 36px;
            }
            &_article {
                color: #596b79;
                line-height: 2;
                font-size: 30px;
                text-indent: 50px;
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
            &_percent {
                text-align: right;
                color: $color_999;
                font-size: 28px;
            }
            &_pullArticle {
                width: 100%;
                text-align: center;
                color: $color_999;
            }
        }
        &_menu {
            position: fixed;
            top: 150px;
            right: 0;
            transition: all .5s;
            .menu {
                font-size: 28px;
                background: #eb6350;
                border-radius: 15px 0 0 15px;
                color: $color-default;
                transition: all .5s;
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
            .right {
                position: absolute;
                right: 30px;
                top: calc(50% - 30px);
                font-size: 60px;
            }
            .title {
                @include flex-center();
                width: 100%;
                height: 100%;
                box-shadow: 0 4px 10px $ccc-color;
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
            box-shadow: 0 -4px 10px $ccc-color;
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
                .iconImg {
                    width: 48px;
                    height: 48px;
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
            height: 200px;
            box-shadow: 0 3px 10px rgba(3, 3, 3, 0.1);
            z-index: $navbar-z-index;
            background: $color-default;
            opacity: 0;
            transition: all .5s;
            &_size {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .nowSize {
                font-size: 32px;
            }
            .minus,
            .add {
                width: 30%;
                line-height: 64px;
                text-align: center;
                box-sizing: border-box;
                font-size: 36px;
                color: #a33823;
                border: 1px solid #e9e2d9;
                border-radius: 12px;
                cursor: pointer;
                background: $bgc-theme;
            }
            &_bgColor {
                display: flex;
                justify-content: space-around;
                align-items: center;
                .bgColor {
                    box-sizing: border-box;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
        }
        &_directory {
            position: fixed;
            width: 100%;
            left: -100%;
            top: 0;
            height: 100%;
            box-shadow: 0 3px 10px rgba(3, 3, 3, 0.1);
            z-index: $navbar-z-index;
            background: $color-default;
            opacity: 0;
            transition: all .5s;
            overflow: hidden;
            .ul {
                @include flex-center();
                text-align: center;
                background: $bgc-theme;
                .li {
                    width: 50%;
                    flex-grow: 1;
                }
            }
            &_list {
                overflow-y: scroll;
                height: 100%;
                ._one {
                    height: 100%;
                    &_li {
                        @include ellipsis();
                        width: 100%;
                        font-size: 28px;
                        font-weight: bold;
                        line-height: 88px;
                        cursor: pointer;
                        box-sizing: border-box;
                        position: relative;
                        text-indent: 30px;
                        &:after {
                            content: '';
                            position: absolute;
                            top: 86px;
                            left: 0;
                            width: 100%;
                            height: 1px;
                            background: #eee;
                        }
                    }
                }
                ._two {
                    &_li {
                        font-size: 30px;
                        line-height: 88px;
                        cursor: pointer;
                        font-weight: normal;
                        color: $color_666;
                        position: relative;
                        &:after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 1px;
                            background: #eee;
                        }
                        &:before {
                            content: '';
                            position: absolute;
                            top: 35px;
                            left: 30px;
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background: $color_999;
                        }
                    }
                }
                .bookmark {
                    overflow-y: scroll;
                    height: 100%;
                    .li {
                        width: 100%;
                        font-size: 28px;
                        cursor: pointer;
                        box-sizing: border-box;
                        position: relative;
                        &:after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 1px;
                            background: #eee;
                        }
                        .title {
                            @include ellipsis();
                            width: 100%;
                            color: $color;
                            position: relative;
                        }
                        .txt {
                            @include multiline-ellipsis(2);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        &_help {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            z-index: 99999999;
            .right,
            .left {
                width: 30%;
                height: 100%;
                background: rgba(3, 3, 3, .7);
                .img {
                    width: 120px;
                    height: 220px;
                }
            }
            .center {
                width: 40%;
                height: 100%;
                background: rgba(3, 3, 3, .8);
                .img {
                    width: 220px;
                    height: 400px;
                }
            }
            .right,
            .left,
            .center {
                @include flex-center();
            }
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
    .bgActived {
        border: 1px solid $link-active-color;
    }
    .isNight {
        background-color: #000 !important;
        color: $color_999 !important;
    }
    ._isNight {
        background-color: $coloe_3;
        color: $color_999;
    }
    .isDisable{
        color: #cacaca !important;
    }
    .directory {
        left: 0;
        opacity: 1;
    }
    .isDirectory {
        position: relative;
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: $color;
        }
    }
    /*.isHeight {*/
    /*    max-height: 100%!important;*/
    /*    min-height: 82%!important;*/
    /*}*/
</style>
