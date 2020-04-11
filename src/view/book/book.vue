<template>
    <div class="book ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
                route="/home"
                :_active="true"
        >
            <div
                    slot="publicTitleRight"
                    class="book_right"
                    @click="onSearch">
                <van-icon name="search" />
            </div>
        </publicTitle>
        <headSearch
                v-if="isSearch"
                class="book_search"
                @searchVal="searchVal"
                @cancel="onCancel"
                @focus="_focus"
                @_clear="_clear"
                :isCancel="isCancel"
        >
            <div slot="searchContent" class="searchContent" v-if="isCancel">
                <div class="searchResult" @scroll.stop="addScroll($event)">
                    <ul class="ul" v-if="searchResultData.length">
                        <router-link tag="li" class="li ptb30 plr30" v-for="(search, index) of searchResultData" :key="'search' + index" :to="{path: '/bookContentFeed', query: { id: search.id, title: searchValue}}" v-html="ruleTitle(search.title, searchValue)"></router-link>
                        <li class="li noData ptb30 plr30" v-if="searchResultData.length === totalcount">没有更多数据</li>
                    </ul>
                    <div class="li noData ptb30 plr30" v-if="!searchResultData.length">暂无数据</div>
                </div>
            </div>
        </headSearch>
        <div class="mask" v-if="isCancel"></div>
        <div v-if="current === 0">
            <!--  热门  start -->
            <div class="book_box plr30 mt20" v-if="hotData">
                <div class="book_box_menu">
                    <div class="title ptb10">热门</div>
                    <pupblicPanel :listData="hotData" @switchTab="switchTap" :isActive="false"/>
                </div>
            </div>
            <!--  热门  end -->
            <div class="book_box plr30 mt20" v-if="menuData.typelist">
                <div class="book_box_menu" v-for="(item, index) of menuData.typelist" :key="'item' + index" >
                    <div class="title ptb10">{{item.title}}</div>
                    <pupblicPanel :listData="item.list" @switchTab="switchTap" :isActive="false"/>
                </div>
            </div>
        </div>
        <div v-if="current === 1">
            <div class="book_case mb20 plr30">
                <span class="title">我的书架</span>
                <!--                <span class="">管理书架</span>-->
            </div>
            <ul class="swiper_common plr30" v-if="bookCase.length">
                <li class="swiper_common_item mr20 mb20" v-for="(book, index) of bookCase" :key="'book' + index">
                    <div class="content_img mb10" @click="toDetail(book)" :style="{backgroundImage: 'url(' + isImg(book.cover) + ')', backgroundSize: '100% 100%' }">
                        <div class="content_img_free" v-if="book.isfree === '1'"></div>
                    </div>
                    <p class="content_img_title">{{book.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import headSearch from '@/components/headSearch/';
    import pupblicPanel from '@/components/publicPanel';
    import { EventBus } from "@/utils/event-bus";
    import { getAllBook, getHotBook, getSearch, getShelflist } from '@/api/content';
    import { navData } from './config';
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'book',
        data() {
            return {
                navData, // 导航项
                menuData: [], // 列表内容
                hotData: [], // 热门分类
                current: 0, // 下标索引
                searchResultData: [], // 存储搜索结果
                isCancel: false,
                isSearch: false, // 是否显示搜索
                isNum: 0,
                bookCase: [], // 书架
                searchOption: {
                    pageSize: 20,
                    page: 1,
                    searchtype: 1
                },
                searchValue: '', // 搜索关键字
                totalcount: '0', // 数据长度
                defaultImg: require('../../assets/img/no_img.jpg')
            };
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
            /** 2020/3/25
             * 作者：王青高
             * 功能：{} 获取所有分类列表
             * 参数：{}
             */
            getAllBook().then(res => {
                if (res.state === '1') {
                    this.menuData = res.data;
                }
            });
            /** 2020/3/25
             * 作者：王青高
             * 功能：{} 获取热门分类
             * 参数：{}
             */
            getHotBook().then(res => {
                if (res.state === '1') {
                    this.hotData = res.data.list;
                }
            });
            EventBus.$emit("isDisplay", { data: true });
        },
        methods: {
            /** 2020/4/7
            * 作者：王青高
            * 功能：{} 跳转相应的小说
            * 参数：{}
            */
            toDetail(book) {
                if (book.bookitemid) {
                    this.$router.push({ path: '/bookDetail', query: { id: book.bookitemid } });
                } else {
                    this.$router.push({ path: '/bookContentFeed', query: { id: book.bookid } });
                }
            },
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
            /** 2020/3/19
             * 作者：王青高
             * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
             * 参数：{}
             */
            getCurrent(index) {
                this.current = index;
                if (index === 1) {
                    getShelflist().then(res => {
                        if (res.state === '1') {
                            let result = res.data;
                            this.bookCase = result.shelflist;
                        }
                    });
                }
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch(val) {
                if (!this.isSearch) {
                    this.isSearch = true;
                    this.isCancel = true;
                } else {
                    this.isSearch = false;
                }
            },
            /** 2020/3/23
             * 作者：王青高
             * 功能：{} 切换搜索或分类页
             * 参数：{}
             */
            switchTap(data) {
                this.$router.push({ path: '/bookTypeList', query: { id: data.id, title: data.title } });
            },
            /** 2020-3-25 0025
             *作者:王青高
             *功能: 发起搜索
             *参数:
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
                getSearch({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page++,
                    keyword: this.searchValue,
                    searchtype: this.searchOption.searchtype
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        if (result && result.list) {
                            this.totalcount = result.totalcount;
                            this.searchResultData = this.searchResultData.concat(result.list);
                        }
                    }
                });
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {}
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
            }
        },
        components: {
            publicTitle,
            headSearch,
            pupblicPanel
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .book {
        background: $bgc-theme;
        &_box {
            background: $bgc-theme;
        }
        &_right {
            width: 100px;
            height: $size;
            font-size: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
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
                height: 100vh;
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
                    .ul {

                    }
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
                }
            }
        }
        .swiper_common {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            &_item {
                width: 22.8%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                &:nth-child(4n) {
                    margin-right: 0;
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
            }
        }
        &_case {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
        }
    }
    .title {
        color: $color;
        text-align: left;
        font-size: 28px;
    }
    .library_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        &_li {
            width: 20%;
            border: 1px solid $color;
            background: #fefff9;
            border-radius: 60px;
            text-align: center;
            &:nth-child(3n) {
                margin-right: 0;
            }
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
</style>
