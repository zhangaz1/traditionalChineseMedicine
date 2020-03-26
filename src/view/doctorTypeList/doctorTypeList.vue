<template>
    <div class="doctorTyeList pb100">
        <van-sticky>
            <div class="doctorTyeList_sticky">
                <van-nav-bar
                        title="医案"
                        right-text="..."
                        left-arrow
                        @click-left="onGoBack"
                        @click-right="onClickRight"
                        class="doctorTyeList_title"
                />
                <headSearch
                        class="doctorTyeList_search"
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
        <div class="doctorTyeList_item">
            <div class="tips ptb20 plr30">找到 {{searchResultData.length ? searchResultData.length : 0}} 条结果</div>
            <div v-if="searchResultData.length">
                <div class="plr30 ptb20 content" v-for="(item, index) of searchResultData" :key="'item' + index" @click="switchDetail(item.id)">
                    <div class="title ptb10">{{item.title}} 副鼻窦炎 | 程莘农</div>
                    <div class="desc ptb10"><span class="desc_t">【证候表现】</span>经常鼻流黄涕十余年。</div>
                    <div class="provenance ptb10"><span class="provenance_t">【出处】</span>《世中联名老中医典型医案》</div>
                </div>
            </div>
        </div>
        <load-more :loadingType="loadingType" :contentText="contentText"/>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import { getDoctorSearch, getDoctorArticle } from '@/api/content';
    import loadMore from '@/components/loadMore/loadMore.vue';
    export default {
        name: 'doctorTypeList',
        data() {
            return {
                isShow: false, // 默认不显示菜单
                current: 0, // 当前下标
                isCancel: false,
                isDefaultVal: '', // 默认关键字
                searchOption: {
                    pageSize: 10,
                    page: 1,
                    searchtype: 2
                },
                searchResultData: [], // 显示搜索结果数据
                loadingType: 0,
                contentText: {
                    contentdown: '上拉显示更多',
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了'
                },
            };
        },
        components: {
            headSearch,
            loadMore
        },
        created() {
            let obj = this.$route.query;
            this.isDefaultVal = obj.title;
            this.getDoctorArticle(obj.id);
        },
        methods: {
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 搜索框搜索
             *参数:
             */
            getDoctorSearch(val) {
                this.loadingType = 1;
                getDoctorSearch({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page,
                    keyword: val,
                    searchtype: this.searchOption.searchtype
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.searchResultData = result.list;
                        if (this.searchResultData.length < 10) this.loadingType = 2;
                    }
                });
            },
            /** 2020-3-26 0026
             *作者: 王青高
             *功能: 获取医案文章列表
             *参数:
             */
            getDoctorArticle(id) {
                this.loadingType = 1;
                getDoctorArticle({
                    pagesize: this.searchOption.pageSize,
                    page: this.searchOption.page,
                    channelid: id
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.searchResultData = result.list;
                        if (this.searchResultData.length < 10) this.loadingType = 2;
                    }
                });
            },
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 跳转详情
             *参数:
             */
            switchDetail(articleId) {
                this.$router.push({ path: '/doctorCase/components/doctorDetail', query: { id: articleId } });
            },
            /** 2020-3-26 0026
             *作者:青型科技
             *功能:
             *参数:
             */
            searchVal(val) {
                if (val) {
                    this.getDoctorSearch(val);
                }
            },
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
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} getCurrent 获取当前焦点，并向父组件传送
             * 参数：{} index 当前索引
             */
            getCurrent(index) {
                this.current = index;
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
    .doctorTyeList {
        position: relative;
        background: $bgc-theme;
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
        &_item {
            background: $bgc-theme;
            position: relative;
            .tips {
                position: relative;
                text-align: center;
                &:after {
                    content: '';
                    position: absolute;
                    left: 5%;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 5%;
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
</style>
