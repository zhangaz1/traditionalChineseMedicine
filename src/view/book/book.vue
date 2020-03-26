<template>
    <div class="book ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
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
<!--                <div v-if="!searchResultData.length" class="hot plr30">-->
<!--                    <div class="title ptb20">热搜</div>-->
<!--                    <ul class="content ptb20">-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--                <div v-if="!searchResultData.length" class="history plr30">-->
<!--                    <div class="title ptb20">-->
<!--                        搜索历史-->
<!--                        <van-icon name="delete" class="title_icon" @click="_delete"/>-->
<!--                    </div>-->
<!--                    <ul class="content ptb20">-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>-->
<!--                    </ul>-->
<!--                </div>-->
                <div class="searchResult">
                    <ul class="ul" v-if="searchResultData.length">
                        <router-link tag="li" class="li ptb30 plr30" v-for="(search, index) of searchResultData" :key="'search' + index" :to="{path: '/bookContentFeed', query: { id: search.id, title: search.title}}">{{search.title}}</router-link>
                    </ul>
                </div>
            </div>
        </headSearch>
        <div class="mask" v-if="isCancel"></div>
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
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import headSearch from '@/components/headSearch/';
    import pupblicPanel from '@/components/publicPanel';
    import { EventBus } from "@/utils/event-bus";
    import { getAllBook, getHotBook, getSearch } from '@/api/content';
    import { navData } from './config';
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
                searchOption: {
                    pageSize: 10,
                    page: 1,
                    searchtype: 2
                }
            };
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
            /** 2020/3/19
             * 作者：王青高
             * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
             * 参数：{}
             */
            getCurrent(index) {
                this.current = index;
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
                this.$router.push({ path: '/bookTypeLlist', query: { id: data.id, title: data.title } });
            },
            /** 2020-3-25 0025
             *作者:王青高
             *功能: 发起搜索
             *参数:
             */
            searchVal(val) {
                getSearch({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page,
                    keyword: val,
                    searchtype: this.searchOption.searchtype
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.searchResultData = result.list;
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
                // console.log('取消');
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
