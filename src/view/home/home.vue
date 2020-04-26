<template>
    <div class="home pb100">
        <van-sticky>
            <div class="home_sticky">
                <van-nav-bar
                        right-text="..."
                        @click-right="onClickRight"
                        class="mb20"
                >
                    <template #title>
                        <img :src="titleImg" alt="" class="titleImg">
                    </template>
                </van-nav-bar>
                <headSearch
                        class="home_search"
                        @searchVal="searchVal"
                        @cancel="onCancel"
                        @focus="_focus"
                        @_clear="_clear"
                        :isCancel="isCancel"
                        @openDetail="openDetail"
                >
                    <div slot="searchContent" class="searchContent" v-if="isCancel">
                        <div class="searchResult" @scroll.stop="addScroll($event)">
                            <ul class="ul" v-if="searchResultData.length">
                                <li
                                        class="li ptb30 plr30"
                                        v-for="(search, index) of searchResultData"
                                        :key="'search' + index"
                                        @click="openDetail(search.title)"
                                        v-html="ruleTitle(search.title, searchValue)"></li>
                                <li class="li noData ptb30 plr30" v-if="searchResultData.length === totalcount">没有更多数据</li>
                            </ul>
                            <div class="li noData ptb30 plr30" v-if="!searchResultData.length">暂无数据</div>
                        </div>
                    </div>
                </headSearch>
            </div>
        </van-sticky>
        <publicSwipe heightVal="200" class="home_swiper">
            <van-swipe-item v-for="(imgItem, index) of bannerData" :key="index + 'imgItem'"  class="home_swiper_item" slot="swiperItem">
                <a :href="imgItem.url">
                    <img :src="isImg(imgItem.img)" class="img"/>
                </a>
            </van-swipe-item>
        </publicSwipe>
        <subMenu class="plr30 bg_f ptb10" title="医案推荐榜" toRouter="/doctorCase">
            <ul class="home_nav ptb20" slot="content">
                <router-link tag="li" :to="{path:'/doctorTypeList', query: {id: nav.id, title: nav.title}}" class="home_nav_li mb20 mr20" v-for="(nav, index) of doctorData" :key="'nav' + index">
                    <p class="txt ptb10 plr20">{{nav.title}}</p>
                </router-link>
            </ul>
        </subMenu>
        <subMenu class="plr30 bg_f ptb10" title="书籍推荐榜" toRouter="/book">
            <!--            <swiper class="swiper_common" :options="swiperBook" slot="content">-->
            <!--                <swiper-slide  class="swiper_common_item" v-for="(book, index) of booklist" :key="'book' + index">-->
            <!--                    <router-link tag="div" :to="{path: '/bookContentFeed', query: { id: book.id }}" :style="{backgroundImage: 'url(' + book.cover + ')', backgroundSize: '100% 100%' }" class="content_img">-->
            <!--                        <div class="content_img_free" v-if="book.isfree === '1'"></div>-->
            <!--                    </router-link>-->
            <!--                    <p class="content_img_title pl10">{{book.title}}</p>-->
            <!--                </swiper-slide>-->
            <!--            </swiper>-->
            <ul class="swiper_common" slot="content">
                <li class="swiper_common_item mb20" v-for="(book, index) of booklist" :key="'book' + index">
                    <router-link class="content_img mb10" :to="{path: '/bookContentFeed', query: { id: book.id }}" :style="{backgroundImage: 'url(' + isImg(book.cover) + ')', backgroundSize: '100% 100%' }">
                        <div class="content_img_free" v-if="book.isfree === '1'"></div>
                    </router-link>
                    <p class="content_img_title">{{book.title}}</p>
                </li>
            </ul>
        </subMenu>
        <subMenu class="plr30 bg_f ptb10" title="视频推荐榜" toRouter="/videoBox">
            <!--            <swiper class="swiper_common" :options="swiperVideo" slot="content">-->
            <!--                <swiper-slide v-for="(video, index) in videoData" :key="index  + 'videoData'"  class="swiper_common_item">-->
            <!--                    <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: video.id}}" class="swiper_common_item_link">-->
            <!--                        <div class="item_img">-->
            <!--                             <img :src="video.cover" class="_img mb20"/>-->
            <!--                            <span class="_txt">{{video.title}}</span>-->
            <!--                        </div>-->
            <!--                        <p class="txt_title ptb20">{{video.title}}</p>-->
            <!--                    </router-link>-->
            <!--                </swiper-slide>-->
            <!--            </swiper>-->
            <ul class="swiper_common" slot="content">
                <li class="swiper_common_item w30 mb20 _mr0" v-for="(video, index) of videoData" :key="'videoData' + index">
                    <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: video.id}}" class="swiper_common_item_link">
                        <div class="item_img">
                            <img :src="isImg(video.cover)" class="_img mb20"/>
                            <span class="_txt">{{video.title}}</span>
                        </div>
                        <p class="txt_title ptb20">{{video.title}}</p>
                    </router-link>
                </li>
            </ul>
        </subMenu>
        <copyright/>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import publicSwipe from '@/components/publicSwipe/';
    import subMenu from './components/subMenu';
    import copyright from './components/copyright';
    import { swiperVideo, swiperBook } from './config';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { getHomeInfo, getSearch, searchHotWords } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'home',
        data() {
            return {
                swiperVideo,
                swiperBook,
                isShow: false, // 是否显示顶部菜单
                isCancel: false,
                searchResultData: [], // 存储搜索结果
                doctorData: [], // 医案推荐榜
                bannerData: [], // banner图
                videoData: [], // 视频推荐榜
                booklist: [], // 书籍推荐榜
                searchOption: {
                    pageSize: 20,
                    page: 1,
                    searchtype: 0
                },
                searchValue: '', // 搜索关键字
                totalcount: '0', // 数据长度
                titleImg: '', // 页面标题
                defaultImg: require('../../assets/img/no_img.jpg')
            };
        },
        components: {
            headSearch,
            publicSwipe,
            subMenu,
            swiper,
            swiperSlide,
            copyright
        },
        computed: {
            isImg() {
                return function (img) {
                    if (img) {
                        return img;
                    } else {
                        return this.defaultImg;
                    }
                };
            },
            ruleTitle
        },
        mounted() {
            this.getHomeInfo();
            EventBus.$emit('isDisplay', { data: true });
        },
        methods: {
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 监听滚动条是否触底
             * 参数：{}
             */
            addScroll(event) {
                if (this.totalcount === this.searchResultData.length) return;
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= (scrollHeight - 10)) {
                    this.searchVal(this.searchValue);
                }
            },
            /** 2020-3-25 0025
             *作者:王青高
             *功能: 获取首页信息
             *参数:
             */
            getHomeInfo() {
                getHomeInfo().then(res => {
                    if (res.state === '1') {
                        let result = res.data;
                        this.doctorData = result.yalist.slice(0, 8);
                        this.bannerData = result.banners;
                        this.videoData = result.vediolist.slice(0, 6);
                        this.booklist = result.booklist.slice(0, 8);
                        this.titleImg = result.logo;
                    }
                });
            },
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 根据类型跳转不同的搜索结果页
             * 参数：{}
             */
            openDetail(obj) {
                if (obj) {
                    this.$router.push({ name: 'searchResult', params: { type: 1, keyword: obj } });
                    // this.$router.push({ path: '/searchResult', query: { type: 1, keyword: obj } });
                    // this.$router.push({ name: 'searchResult', params: { data: obj, keyword: this.searchValue } });
                    // switch (obj.type) {
                    //     case 1:
                    //         this.$router.push({ path: '/bookContentFeed', query: { id: obj.id } });
                    //         break;
                    //     case 2:
                    //         this.$router.push({ path: '/doctorCase/components/doctorDetail', query: { id: obj.id } });
                    //         break;
                    //     case 3:
                    //         this.$router.push({ path: '/videoBox/components/videoBoxDetail', query: { id: obj.id } });
                    //         break;
                    // }
                }
            },
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 根据关键字搜索内容
             * 参数：{}
             */
            searchVal(val) {
                if (!val && this.searchValue === '') {
                    this.searchResultData = [];
                    this.searchOption.page = 1;
                    return;
                }
                if (!val || val !== this.searchValue) {
                    this.searchResultData = [];
                    this.searchOption.page = 1;
                }
                this.searchValue = val;
                if (this.searchValue) {
                    searchHotWords({
                        keyword: this.searchValue
                    }).then(res => {
                        let result = res.data;
                        if (res.state === '1') {
                            this.searchResultData = result.hotword;
                        }
                    });
                }
                // getSearch({
                //     pagesize: this.searchOption.pageSize,
                //     page: this.searchOption.page++,
                //     keyword: this.searchValue,
                //     searchtype: this.searchOption.searchtype
                // }).then(res => {
                //     let result = res.data;
                //     if (res.state === '1') {
                //         this.totalcount = result.totalcount;
                //         this.searchResultData = this.searchResultData.concat(result.list);
                //     }
                // });
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {} 跳转 我的足迹/收藏
             *参数:
             */
            onClickRight() {
                this.$router.push('/footprint');
            },
            /** 2020/3/24
             * 作者：王青高
             * 功能：{} 点击搜索框取消
             * 参数：{}
             */
            onCancel() {
                if (this.isCancel) {
                    this.isCancel = false;
                    this.searchResultData = [];
                }
            },
            /** 2020/3/24
             * 作者：王青高
             * 功能：{} 搜索框获取焦点
             * 参数：{}
             */
            _focus() {
                if (!this.isCancel) {
                    this.isCancel = true;
                }
            },
            /** 2020/3/24
             * 作者：王青高
             * 功能：{} 删除历史
             * 参数：{}
             */
            _delete() {
                console.log('删除历史');
            },
            /** 2020/3/24
             * 作者：王青高
             * 功能：{} 点击清除按钮触发
             * 参数：{}
             */
            _clear() {
                if (this.searchResultData.length) {
                    this.searchResultData = [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar__right {
        font-size: $icon-font-size;
        padding-bottom: 10px;
    }
    /* 设置导航栏背景图 */
    .van-nav-bar__title {
        color: $color;
    }
    .van-nav-bar__text {
        color: $coloe_3;
    }
    .van-sticky {
    }
    .home {
        position: relative;
        .titleImg {
            width: 100%;
            height: 92px;
        }
        &_dropDown {
            position: absolute;
            right: 20px;
            top: 90px;
            background: $bgc-theme;
            width: 300px;
            z-index: $dropDown;
            box-shadow: 0 -2px 16px 2px rgba(102,102,102,0.2);
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
        &_sticky {
            background: #f3f2eb;
            position: relative;
        }
        &_search {
            position: relative;
            border-bottom: 1px solid $ccc-color;
            .searchContent {
                position: absolute;
                background: $bgc-theme;
                width: 100%;
                left: 0;
                top: 110px;
                z-index: 9999;
                .history,
                .hot {
                    .title {
                        font-size: 28px;
                        line-height: 28px;
                        color: $color;
                        position: relative;
                        &_icon {
                            position: absolute;
                            right: 0;
                            top: 8px;
                            font-size: 48px;
                            color: $coloe_3;
                        }
                    }
                    .content {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        .li {
                            @include flex-center();
                            border-radius: 50px;
                            background: #f3f2ed;
                        }
                    }
                }
                .searchResult {
                    height: 80vh;
                    overflow-y: scroll;
                    .ul {

                    }
                    .li {
                        /*height: 100px;*/
                        /*line-height: 100px;*/
                        font-size: 36px;
                        color: $coloe_3;
                        position: relative;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background: $bg_ddcdaf;
                        }
                        &.noData {
                            text-align: center;
                            color: $ccc-color;
                            font-size: 28px;
                        }
                    }
                }
            }
        }

        /* banner图 start */
        &_swiper_item {
            height: 200px;
            .img {
                width: 100%;
            }
        }
        /* banner图 end */
        &_nav {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            &_li {
                width: auto;
                border: 1px solid $color;
                background: #fefff9;
                border-radius: 60px;
                text-align: center;
                .txt {
                    text-align: center;
                    color: #333;
                    font-size: 30px;
                }
            }
        }
        .swiper_common {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            &_item {
                width: 25%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0 2px;
                &.w30 {
                    width: 33.3%;
                    padding: 0 8px;
                }
                .content_img {
                    width: 100%;
                    height: 200px;
                    &_free {
                        display: block;
                        width: 28px;
                        height: 28px;
                        background: url(../../assets/img/free_icon.png) center center no-repeat;
                        background-size: 28px 28px;
                        background: none\9;
                        position: absolute;
                        right: 8px;
                        top: -8px;
                        z-index: 1;
                        border: 1px solid transparent;
                        box-sizing: border-box;
                    }
                    &_txt {
                        position: absolute;
                        left: 10px;
                        top: 20px;
                        max-width: 190px;
                        min-height: 110px;
                        max-height: 166px;
                        padding: 4px;
                        background-color: #fffbf5;
                        writing-mode: vertical-rl;
                        direction: rtl;
                        .title {
                            width: 100%;
                            cursor: pointer;
                            padding: 6px 0;
                            font-size: 28px;
                            text-align: center;
                            color: $coloe_3;
                            writing-mode: vertical-rl;
                            writing-mode: tb-rl;
                            direction: rtl;
                            border: 1px solid $color_999;
                            .name {
                                color: $coloe_3;
                            }
                        }
                    }
                    &_line {
                        width: 24px;
                        height: 100%;
                        list-style-type: none;
                        box-sizing: border-box;
                        border-left: 1px solid #fffbf5;
                        position: absolute;
                        top: 0;
                        right: 0;
                        .li {
                            border-bottom: 1px solid #eee;
                            width: 100%;
                            height: 25%;
                            box-sizing: border-box;
                            &:first-child,
                            &:last-child {
                                height: 12.5%;
                            }
                            &:last-child {
                                border-bottom: 0;
                            }

                        }
                    }
                }
                .content_img_title {
                    @include multiline-ellipsis(2);
                    font-size: 24px;
                    color: $color_666;
                    width: 100%;
                    text-align: center;
                }
                &_link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    .txt {
                        font-size: 24px;
                        color: #828282;
                        width: 100%;
                        @include multiline-ellipsis(2);
                    }
                    .img {
                        width: 100%;
                        height: 240px;
                    }
                    .icon {
                        position: absolute;
                        right: 10px;
                        top: -10px;
                        width: 50px;
                        height: 50px;
                    }
                    /* 视频推荐 start */
                    .item_img {
                        position: relative;
                        width: 100%;
                        height: 240px;
                        ._img {
                            width: 100%;
                            height: 100%;
                        }
                        ._txt {
                            @include ellipsis();
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            width: 100%;
                            background: rgba(3, 3, 3, .1);
                        }
                    }
                    .txt_title {
                        font-size: 24px;
                        color: #828282;
                        text-align: left;
                        width: 100%;
                    }
                    /* 视频推荐 end */
                }
            }
        }
        /* 轮播图 start */
        &_swiper {
            width: 100%;
            margin: 0 auto;
        }
        /* 轮播图 end */
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
