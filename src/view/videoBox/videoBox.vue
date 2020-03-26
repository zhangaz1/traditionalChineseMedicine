<template>
    <div class="videoBox ptb108">
        <van-nav-bar :title="title" left-arrow @click-right="onSearch"  @click-left="onGoBack" fixed class="videoBox_title">
            <van-icon name="search" slot="right" />
        </van-nav-bar>
        <headSearch
                v-if="isSearch"
                class="videoBox_search"
                @searchVal="searchVal"
                @cancel="onCancel"
                @focus="_focus"
                @_clear="_clear"
                :isCancel="isCancel"
        >
            <div slot="searchContent" class="searchContent" v-if="isCancel">
                <div class="searchResult">
                    <ul class="ul" v-if="searchResultData.length">
                        <router-link tag="li" class="li ptb30 plr30" v-for="(search, index) of searchResultData" :key="'search' + index" :to="{path: '/searchResult', query: {name: search}}">{{search}}</router-link>
                    </ul>
                </div>
            </div>
        </headSearch>
        <div class="mask" v-if="isCancel"></div>
        <div class="videoBox_nav mt20 mb20 plr30">
            <transition name="slide-fade">
                <ul class="videoBox_nav_ul ptb20 mb40" :class="{_move: isMove}">
                    <li class="videoBox_nav_ul_li mlr10 mb20" v-for="(item, index) of parentTypes" :class="{active: current === index}" :key="'item' + index" @click="switchTap(item, index)">{{item.title}}</li>
                </ul>
            </transition>
            <span class="videoBox_nav_icon" @click="_animation" :class="{isDeg: isMove}"></span>
        </div>
        <div class="videoBox_content plr30">
            <div class="videoBox_content_title ptb20">
                <div class="videoBox_content_video">视频内容</div>
                <div class="videoBox_content_num">共有{{totalcount}}部</div>
            </div>
            <ul class="videoBox_content_item">
                <router-link v-for="(video, index) of videoData" :key="'video' + index" :to="{path: '/videoBox/components/videoBoxDetail', query: {id: video.id}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img :src="video.cover" class="_img mb20"/>
                        <span class="_txt p8">{{video.title}}</span>
                    </div>
                    <p class="txt_title ptb20">{{video.title}}</p>
                </router-link>
            </ul>
        </div>
        <load-more :loadingType="loadingType" :contentText="contentText"/>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import { getVideoData, getVediolistByChannel } from '@/api/content';
    import loadMore from '@/components/loadMore/loadMore.vue';
    export default {
        name: 'videoBox',
        data() {
            return {
                title: '视频',
                isMove: false,
                searchResultData: [], // 存储搜索结果
                isCancel: false,
                isSearch: false, // 是否显示搜索
                videoData: [], // 视频数据
                parentTypes: [], // 视频分类
                totalcount: '', // 视频总数
                current: 0, // 当前下标
                loadingType: 0,
                contentText: {
                    contentdown: '上拉显示更多',
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了'
                }
            };
        },
        components: {
            headSearch,
            loadMore
        },
        mounted() {
            this.getVideoData();
            this.handleScroll();
        },
        created() {

        },
        methods: {
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 监听滚动条
            * 参数：{}
            */
            handleScroll() {
                window.onscroll = function () {
                    // 变量scrollTop是滚动条滚动时，距离顶部的距离
                    var scrollTop =
                        document.documentElement.scrollTop || document.body.scrollTop; // 变量windowHeight是可视区的高度
                    var windowHeight =
                        document.documentElement.clientHeight || document.body.clientHeight; // 变量scrollHeight是滚动条的总高度
                    var scrollHeight =
                        document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条到底部的条件
                    if (scrollTop + windowHeight === scrollHeight) {
                        console.log('scrollTop', scrollTop, 'windowHeight', windowHeight, 'scrollHeight', scrollHeight);

                    };
                };
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 获取视频初始化信息
            * 参数：{}
            */
            getVideoData() {
                getVideoData().then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.videoData = result.vedios;
                        this.parentTypes = result.parentTypes;
                        this.totalcount = result.totalcount;
                    }
                });
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch(val) {
                console.log('点击了搜索');
                if (!this.isSearch) {
                    this.isSearch = true;
                    this.isCancel = true;
                } else {
                    this.isSearch = false;
                }
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{} 返回上一页
            * 参数：{}
            */
            onGoBack() {
                this.$router.go(-1);
            },
            /** 2020/3/20
            * 作者：王青高
            * 功能：{} 显示导航菜单
            * 参数：{}
            */
            _animation() {
                if (this.isMove) {
                    this.isMove = false;
                } else {
                    this.isMove = true;
                }
            },
            searchVal(val) {
                console.log('搜索内容', val);
                if (val) {
                    this.searchResultData.push(val);
                }
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
                    this.isSearch = false;
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
            },
            /** `2020/3/26`
            * 作者：王青高
            * 功能：{} 切换分类
            * 参数：{}
            */
            switchTap(obj, index) {
                this.current = index;
                getVediolistByChannel(obj.id).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.videoData = result.list;
                        this.totalcount = result.totalcount;
                    }
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
    .videoBox {
        position: relative;

        &_title {
            height: 108px;
        }
        &_search {
            position: relative;
            border-bottom: 1px solid $ccc-color;
            left: 0;
            top: -108px;
            z-index: $search-z-index;
            .searchContent {
                position: absolute;
                background: $bgc-theme;
                width: 100%;
                height: 110vh;
                left: 0;
                top: 110px;
                z-index: $search-z-index;
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
                    .li {
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
                    }
                }
            }
        }
        &_nav {
            background: $bgc-theme;
            position: relative;
            overflow: hidden;
            &_ul {
                height: 20px;
                transition: all .5s;
                &_li {
                    display: inline-block;
                    font-size: 28px;
                    color: $coloe_3;
                }
            }
            &_icon {
                position: absolute;
                left: 50%;
                bottom: 0;
                font-size: 48px;
                color: $coloe_3;
                animation: tb_s .7s ease-in-out infinite;
                right: 4px;
                width: 14px;
                height: 14px;
                border-top: 4px solid #ccc;
                border-right: 4px solid #ccc;
                transform: rotate(135deg);
            }
        }

        &_content {
            background: $bgc-theme;
            &_title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;
            }
            &_item {
                &_li {
                    position: relative;
                    width: 31%;
                    height: 100%;
                    display: inline-block;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    /* 视频推荐 start */
                    .item_img {
                        position: relative;
                        flex-grow: 1;
                        box-shadow: 2px 2px 2px 5px rgba(3, 3, 3, .1);
                        border-radius: 10px;
                        height: 240px;
                        ._img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                        }

                        ._txt {
                            @include ellipsis();
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            background: rgba(3, 3, 3, 0.6);
                            border-radius: 10px 0;
                            color: $color-default;
                            font-size: 28px;
                            width: 90%;
                        }
                    }

                    .txt_title {
                        @include ellipsis();
                        font-size: 24px;
                        color: #828282;
                        text-align: left;
                        width: 100%;
                    }
                    /* 视频推荐 end */
                }
            }
        }
    }
    ._move {
        height: 260px;
        overflow-y: scroll;
    }
    @keyframes tb_s {
        0% {
            position: absolute;
            bottom: 0;
        }
        100% {
            position: absolute;
            bottom: 10px;
        }
    }
    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: #fff;
    }
    .isDeg {
        transform: rotate(315deg) !important;
    }
    .active {
        color: $color;
    }
</style>
