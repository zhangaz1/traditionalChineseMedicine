<template>
    <div class="searchResult">
        <van-sticky>
            <div class="searchResult_sticky">
                <van-nav-bar
                        title="搜索结果"
                        right-text="..."
                        left-arrow
                        @click-left="onGoBack"
                        @click-right="onClickRight"
                        class="searchResult_title"
                />
                <headSearch
                        class="searchResult_search"
                        @searchVal="searchVal"
                        @cancel="onCancel"
                        @focus="_focus"
                        @_clear="_clear"
                        :isCancel="isCancel"
                        :_searchVal="searchValue"
                >
                </headSearch>
            </div>
        </van-sticky>
        <!--        <div class="mask" v-if="isCancel"></div>-->
        <div class="searchResult_nav">
            <swiper class="swiper" :options="swiperNav">
                <swiper-slide
                        v-for="(nav, index) of navData"
                        :key="'nav' + index"
                        :class="{active: current === index}"
                        class="swiper_item">
                    <span @click.stop="getCurrent(index, nav.component)">{{nav.name}}</span>
                </swiper-slide>
            </swiper>
        </div>
        <!-- 动态组件 -->
        <component
                :is="componentName"
                :searchData="searchResultData"
                @isScroll="isScroll"
                :searchValue="searchValue"
                :totalcount="totalcount">
            <div class="li noData ptb30 plr30" v-if="!searchResultData.length && totalcount === 0">暂无数据</div>
            <div class="li noData ptb30 plr30" v-else-if="searchResultData.length === totalcount">没有更多数据</div>
        </component>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import books from "./components/books";
    import doctorBook from "./components/doctorBook";
    // import prescriptions from "./components/prescriptions";
    // import askDisease from "./components/askDisease";
    // import wikipedia from "./components/wikipedia";
    import videoList from "./components/videoList";
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { navData, swiperNav } from './config';
    import { getSearch, searchInfoByKeyWords } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    export default {
        name: 'searchResult',
        data() {
            return {
                isShow: false, // 默认不显示菜单
                navData,
                swiperNav,
                current: 0, // 当前下标
                componentName: 'books', // 组件名
                searchResultData: [], // 存储搜索结果
                isCancel: false,
                searchOption: {
                    pageSize: 20,
                    page: 1,
                    searchtype: 1
                },
                totalcount: 0,
                searchValue: '', // 搜索关键字
            };
        },
        components: {
            headSearch,
            books,
            doctorBook,
            // prescriptions,
            // askDisease,
            // wikipedia,
            videoList,
            swiper,
            swiperSlide
        },
        created() {
            let obj = this.$route.params;
            if (Object.keys(obj).length) {
                // 正则匹配汉字，
                let reg = /[\u4e00-\u9fa5]/g;
                // 保证提取到绝对汉字，防止取到转义字符
                this.searchValue = obj.keyword.match(reg).join('');
                this.searchOption.searchtype = obj.type;
                this.current = obj.type - 1;
                if (this.searchValue) this.searchVal(this.searchValue);
                this.componentName = this.navData[this.current].component;
            }
        },
        methods: {
            /** 2020/3/20
             * 作者：王青高
             * 功能：{Function} 返回上一页
             * 参数：{}
             */
            onGoBack() {
                this.$router.go(-1);
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: 点击右上角菜单
             *参数:
             */
            onClickRight() {
                this.$router.push('/footPrint');
                // if (this.isShow) {
                //     this.isShow = false;
                // } else {
                //     this.isShow = true;
                // }
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} getCurrent 获取当前焦点，并向父组件传送
             * 参数：{} index 当前索引
             */
            getCurrent(index, component) {
                this.current = index;
                this.componentName = component;
                this.searchOption.searchtype = (this.current + 1);
                this.searchResultData = [];
                this.searchOption.page = 1;
                this.searchVal(this.searchValue);
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
                }
            },
            /** 2020/4/10
             * 作者：王青高
             * 功能：{} 发起搜索请求
             * 参数：{}
             */
            searchVal(val) {
                if (val) {
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
                        this.getSearch();
                    }
                }
            },
            /** 2020-4-15 0015
             *作者:王青高
             *功能: 搜索内容
             *参数:
             */
            getSearch() {
                getSearch({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page++,
                    keyword: this.searchValue,
                    searchtype: this.searchOption.searchtype
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.totalcount = result.totalcount;
                        this.searchResultData = this.searchResultData.concat(result.list);
                    }
                });
            },
            /** 2020/4/10
             * 作者：王青高
             * 功能：{} 监听子组件滚动, 触发请求
             * 参数：{}
             */
            isScroll() {
                this.searchVal(this.searchValue);
            }
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
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
    .searchResult {
        position: relative;
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
                    .digest {
                        @include multiline-ellipsis(2);
                        font-size: 28px;
                        color: $coloe_3;
                        line-height: 1.5;
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
    .noData {
        text-align: center;
        color: $ccc-color;
        font-size: 28px;
    }
</style>
