<template>
    <div class="videoBox ptb108">
        <van-nav-bar :title="title" @click-right="onSearch" fixed class="videoBox_title">
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
                <div class="searchResult" @scroll.stop="addScroll($event)">
                    <ul class="ul" v-if="searchResultData.length">
                        <router-link tag="li" class="li ptb30 plr30" v-for="(search, index) of searchResultData" :key="'search' + index" :to="{path: '/videoBox/components/videoBoxDetail', query: { id: search.id, title: search.title}}"  v-html="ruleTitle(search.title, searchValue)">{{search.title}}</router-link>
                        <li class="li noData ptb30 plr30" v-if="searchResultData.length === totalcount">没有更多数据</li>
                    </ul>
                    <div class="li noData ptb30 plr30" v-if="!searchResultData.length">暂无数据</div>
                </div>
            </div>
        </headSearch>
        <div class="mask" v-if="isCancel"></div>
        <div class="videoBox_nav mt20 mb20 plr30">
            <transition name="slide-fade">
                <ul class="videoBox_nav_ul ptb20 mb40" :class="{_move: isMove}">
                    <li class="videoBox_nav_ul_li mlr10 mb20" v-for="(item, index) of parentTypes" :class="{active: current === index}" :key="'item' + index" @click="switchTap(item, index, true)">{{item.title}}</li>
                </ul>
            </transition>
            <span class="videoBox_nav_icon" @click="_animation" :class="{isDeg: isMove}"></span>
        </div>
        <div class="videoBox_content plr30">
            <div class="videoBox_content_title ptb20">
                <div class="videoBox_content_video">视频内容</div>
                <div class="videoBox_content_num">共有{{totalcount}}部</div>
            </div>
            <ul class="videoBox_content_item ptb10" @scroll="handleScroll($event)">
                <router-link v-for="(video, index) of videoData"  :key="'video' + index" :to="{path: '/videoBox/components/videoBoxDetail', query: {id: video.id}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img :src="isImg(video.cover)" class="_img mb20"/>
                        <span class="_txt p8">{{video.title}}</span>
                    </div>
                    <p class="txt_title ptb20">{{video.title}}</p>
                </router-link>
                <li class="videoBox_content_item_li mr20" v-if="videoData.length === totalcount">没有更多数据</li>
            </ul>
            <div class="li ptb30 plr30" v-if="!videoData.length">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import { getVideoData, getVediolistByChannel, getSearch } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { ruleTitle } from '@/utils/searchVal';
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
                current: 0, // 当前下标
                pageOption: {
                    channelid: '',
                    pagesize: 10,
                    page: 1
                },
                searchValue: '', // 搜索关键字
                totalcount: '0', // 数据长度, 视频总数
                searchOption: {
                    pageSize: 20,
                    page: 1,
                    searchtype: 3
                },
                defaultImg: require('../../assets/img/no_img.jpg')
            };
        },
        components: {
            headSearch
        },
        computed: {
            ruleTitle,
            isImg() {
                return function (img) {
                    if (img) {
                        return img;
                    } else {
                        return this.defaultImg;
                    }
                };
            }
        },
        mounted() {
            this.getVideoData();
            EventBus.$emit("isDisplay", { data: true });
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
                    this.getSearch(this.searchValue);
                }
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 监听滚动条
            * 参数：{}
            */
            handleScroll(event) {
                if (this.totalcount === this.videoData.length) return;
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= (scrollHeight - 10)) {
                    this.pageOption.page++;
                    this.switchTap();
                }
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
                        this.pageOption.channelid = result.parentTypes[0].id; // 初始化当前列表id;
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
            onSearch() {
                document.documentElement.scrollTop = 0;
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
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 搜索框搜索
             *参数:
             */
            getSearch(val) {
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
                getSearch({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page++,
                    keyword: this.searchValue,
                    searchtype: this.searchOption.searchtype
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        if (result && result.list.length) {
                            this.totalcount = result.totalcount;
                            this.searchResultData = this.searchResultData.concat(result.list);
                        }
                    }
                });
            },
            searchVal(val) {
                this.getSearch(val);
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
                    this.searchOption.page = 1;
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
                    this.searchOption.page = 1;
                }
            },
            /** `2020/3/26`
            * 作者：王青高
            * 功能：{} 切换分类
            * 参数：{}
            */
            switchTap(obj, index, bol) {
                if (bol) {
                    this.videoData = [];
                    this.pageOption.page = 1;
                }
                if (obj) this.pageOption.channelid = obj.id;
                if (index >= 0) this.current = index;
                getVediolistByChannel(this.pageOption).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.videoData = this.videoData.concat(result.list);
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
            position: fixed;
            border-bottom: 1px solid $ccc-color;
            left: 0;
            top: 0;
            width: 100%;
            z-index: $search-z-index;
            .searchContent {
                position: absolute;
                background: $bgc-theme;
                width: 100%;
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
                    height: 80vh;
                    overflow-y: scroll;
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
                        &.noData {
                            text-align: center;
                            color: $ccc-color;
                            font-size: 28px;
                        }
                    }
                    &_normal {
                        text-align: center;
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
                overflow: hidden;
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
            .li {
                width: 100%;
                text-align: center;
                font-size: 28px;
                color: $ccc-color;
            }
            &_item {
                overflow-y: scroll;
                height: 70vh;
                &_li {
                    position: relative;
                    width: 31% !important;
                    height: 300px;
                    display: inline-block;
                    &:last-child {
                        width: 100%;
                        text-align: center;
                        font-size: 28px;
                        color: $ccc-color;
                    }
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
