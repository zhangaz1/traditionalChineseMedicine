<template>
    <div class="bookTypeList pb100">
        <van-sticky>
            <div class="bookTypeList_sticky">
                <van-nav-bar
                        title="古籍"
                        right-text="..."
                        left-arrow
                        @click-left="onGoBack"
                        @click-right="onClickRight"
                        class="bookTypeList_title"
                />
                <headSearch
                        class="bookTypeList_search"
                        @searchVal="searchVal"
                        @cancel="onCancel"
                        @focus="_focus"
                        @_clear="_clear"
                        :isCancel="isCancel"
                        :_searchVal="isDefaultVal"
                >
                </headSearch>
            </div>
        </van-sticky>
        <div class="bookTypeList_item plr30">
            <div class="tips ptb20" >共有{{searchResultData.length}}条结果</div>
            <div class="title ptb20">{{title}}</div>
            <div class="content pl160 ptb20" v-for="(book, index) of searchResultData" :key="'book' + index">
                <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: book.id}}" :style="{backgroundImage: 'url(' + isImg(book.cover) + ')', backgroundSize: '100% 100%' }" class="content_img sprite-book-cover0">
                    <div class="content_img_free" v-if="book.isfree === '1'"></div>
<!--                    <div class="content_img_txt">-->
<!--                        <div class="title">-->
<!--                            <span class="name">{{book.title}}</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <ul class="content_img_line">-->
<!--                        <li class="li"></li>-->
<!--                        <li class="li"></li>-->
<!--                        <li class="li"></li>-->
<!--                        <li class="li"></li>-->
<!--                        <li class="li"></li>-->
<!--                    </ul>-->
                </router-link>
                <div  class="content_txt pl20">
                    <div class="title mb20">{{book.title}}</div>
                    <p class="author mb10">{{book.author}}</p>
                    <p class="description">{{book.description}}</p>
                    <router-link :to="{path: '/bookContentFeed', query: {id: book.id}}" tag="button" type="button" class="resultsBtns">详情</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import { getSearch, getBookListByChannel } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'bookTypeList',
        data() {
            return {
                current: 0, // 当前下标
                title: '', // 标题
                searchResultData: [], // 存储搜索或跳转数据
                isCancel: false,
                isSearch: false, // 是否显示搜索
                isDefaultVal: '', // 默认搜索关键字
                isJump: false,
                pageOption: {
                    pagesize: 20,
                    page: 1
                },
                defaultImg: require('../../assets/img/no_img.jpg')
            };
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
            }
        },
        created() {
            let params = this.$route.query;
            this.getBookListByChannel(params.id);
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
        },
        components: {
            headSearch
        },
        methods: {
            /** 2020/3/31
            * 作者：王青高
            * 功能：{} 点击分类书籍
            * 参数：{}
            */
            getBookListByChannel(id) {
                getBookListByChannel({
                    pagesize: this.pageOption.pagesize,
                    page: this.pageOption.page,
                    channelid: id
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.searchResultData = result.list;
                        this.title = result.channelname;
                    }
                });
            },
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 搜索框搜索
             *参数:
             */
            getSearch(val) {
                getSearch({
                    pagesize: this.pageOption.pagesize,
                    page: this.pageOption.page,
                    keyword: val,
                    searchtype: 1
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.searchResultData = result.list;
                    }
                });
            },
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.push('/book');
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: 点击右上角菜单
             *参数:
             */
            onClickRight() {
                this.$router.push('/footprint');
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} getCurrent 获取当前焦点，并向父组件传送
             * 参数：{} index 当前索引
             */
            getCurrent(index) {
                this.current = index;
            },
            /** 2020-3-25 0025
             *作者:王青高
             *功能: 发起搜索
             *参数:
             */
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
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch() {
                if (!this.isSearch) {
                    this.isSearch = true;
                    this.isCancel = true;
                } else {
                    this.isSearch = false;
                }
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
    .bookTypeList {
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
        &_search {
            position: relative;
            border-bottom: 1px solid $ccc-color;
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
        &_title {
            height: 108px;
            &_dropDown {
                position: absolute;
                right: 20px;
                top: 100px;
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
        }
        &_nav {
            height: 80px;
            background: $bgc-theme;
            .swiper {
                height: 100%;
                &_item {
                    @include flex-center();
                    height: 100%;
                }
            }
        }
        &_item {
            background: $bgc-theme;
            position: relative;
            .title {
                color: $color;
            }
            .tips {
                position: relative;
                width: 100%;
                text-align: center;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0%;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 0%;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
            }
            .content {
                position: relative;
                border-bottom: 1px solid #eee;
                &_img {
                    position: absolute;
                    left: 10px;
                    top: 20px;
                    width: 150px;
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
                &_txt {
                    position: relative;
                    min-height: 200px;
                    .title {
                        font-size: 28px;
                        line-height: 28px;
                        color: $color;
                    }
                    .author {
                        height: 24px;
                        font-size: 24px;
                        line-height: 24px;
                        color: $color_999;
                    }
                    .description {
                        @include ellipsis();
                        font-size: 24px;
                        line-height: 44px;
                        color: $color_666;
                    }
                    .resultsBtns {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        color: $color;
                        display: block;
                        line-height: 68px;
                        height: 68px;
                        width: 216px;
                        border: 1px solid $color;
                        background: $bgc-theme;
                        font-size: 28px;
                        border-radius: 10px;
                        text-align: center;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }
    .active:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        top: 60%;
        right: 0;
        margin: auto;
        width: 50%;
        background: $color;
        height: 6px;
    }
    .sprite-book-cover0 {
        background-color: #405370;
    }
    .sprite-book-cover1 {
        background-color: #6898a7;
    }
    .sprite-book-cover2 {
        background-color: #746174;
    }
    .sprite-book-cover3 {
        background-color: #a98463;
    }
    .sprite-book-cover4 {
        background-color: #b25d43;
    }
</style>
