<template>
    <div class="doctorCase ptb108">
        <publicTitle
                class="publicTitle"
                :navData="navData"
                @getCurrent="getCurrent"
        >
            <div slot="publicTitleRight" class="doctorCase_right" @click="onSearch">
                <van-icon name="search" />
            </div>
        </publicTitle>
        <headSearch
                v-if="isSearch"
                class="doctorCase_search"
                @searchVal="searchVal"
                @cancel="onCancel"
                @focus="_focus"
                @_clear="_clear"
                :isCancel="isCancel"
                @openDetail="openDetail"
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
        <div class="mask" v-if="isCancel"></div>
        <!--  热门  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu">
                <div class="title ptb10">热门</div>
                <pupblicPanel :listData="hotData" @switchTab="switchTap" :isActive="false"/>
            </div>
        </div>
        <!--  热门  end -->
        <!--  科室  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu">
                <div class="title ptb10">科室</div>
                <pupblicPanel :listData="allData" @switchTab="selectType"/>
            </div>
        </div>
        <!--  科室  end -->
        <!--  科室分类  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu" v-for="(item, index) of childrenData" :key="'item' + index">
                <div class="title ptb10">{{item.title}}</div>
                <pupblicPanel :listData="item.list" @switchTab="switchTap" :isActive="false"/>
            </div>
        </div>
        <!--  科室分类 end -->
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import pupblicPanel from '@/components/publicPanel';
    import headSearch from '@/components/headSearch/';
    import { navData, menuData } from './config';
    import { EventBus } from "@/utils/event-bus";
    import { getChildrenDoctor, getIndexData, getSearch, searchHotWords } from '@/api/content';
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'doctorCase',
        data() {
            return {
                navData, // 导航项
                menuData, // 列表内容
                current: 0,
                searchResultData: [], // 存储搜索结果
                isCancel: false,
                isSearch: false, // 是否显示搜索
                hotData: [], // 热门分类
                allData: [], // 所有分类
                childrenData: [], // 二级分类
                searchOption: {
                    pageSize: 20,
                    page: 1,
                    searchtype: 2
                },
                searchValue: '', // 搜索关键字
                totalcount: '0', // 数据长度
            };
        },
        computed: {
            ruleTitle
        },
        mounted() {
            this.getIndexData();
            EventBus.$emit('isDisplay', { data: true });
        },
        methods: {
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 根据类型跳转不同的搜索结果页
             * 参数：{}
             */
            openDetail(obj) {
                if (obj) {
                    this.$router.push({ name: 'searchResult', params: { type: 2, keyword: obj } });
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
            /** 2020-3-25 0025
             *作者:王青高
             *功能: 获取医案首页信息
             *参数:
             */
            getIndexData() {
                getIndexData().then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.hotData = result.hotTypes;
                        this.allData = result.parentTypes;
                        this.childrenData = result.subTypes;
                    }
                });
            },
            /** 2020/3/25
             * 作者：王青高
             * 功能：{} 获取二级分类
             * 参数：{}
             */
            getChildrenDoctor(pid) {
                getChildrenDoctor({ pid }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.childrenData = result.subTypes;
                    }
                });
            },
            /** 2020-3-25 0025
             *作者: 点击科室获取对应分类
             *功能:
             *参数:
             */
            selectType(data) {
                this.getChildrenDoctor(data.id);
            },
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
                this.$router.push({ path: '/doctorTypeList', query: { id: data.id, title: data.title } });
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
                }
            },
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
                            this.searchResultData = this.searchResultData.concat(result.hotword);
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
                //         if (result && result.list.length) {
                //             this.totalcount = result.totalcount;
                //             this.searchResultData = this.searchResultData.concat(result.list);
                //         }
                //     }
                // });
            }
        },
        components: {
            publicTitle,
            pupblicPanel,
            headSearch
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .doctorCase {
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
