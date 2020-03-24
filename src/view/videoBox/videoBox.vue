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
                <div v-if="!searchResultData.length" class="hot plr30">
                    <div class="title ptb20">热搜</div>
                    <ul class="content ptb20">
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                    </ul>
                </div>
                <div v-if="!searchResultData.length" class="history plr30">
                    <div class="title ptb20">
                        搜索历史
                        <van-icon name="delete" class="title_icon" @click="_delete"/>
                    </div>
                    <ul class="content ptb20">
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                        <li class="li plr20 ptb20 mb20 mr20">黄帝内经</li>
                    </ul>
                </div>
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
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                    <li class="videoBox_nav_ul_li mlr10 mb20">中医基础</li>
                </ul>
            </transition>
            <span class="videoBox_nav_icon" @click="_animation" :class="{isDeg: isMove}"></span>
        </div>
        <div class="videoBox_content plr30">
            <div class="videoBox_content_title ptb20">
                <div class="videoBox_content_video">视频内容</div>
                <div class="videoBox_content_num">共有41部</div>
            </div>
            <ul class="videoBox_content_item">
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb20"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb20"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb20"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    export default {
        name: 'videoBox',
        data() {
            return {
                title: '视频',
                isMove: false,
                searchResultData: [], // 存储搜索结果
                isCancel: false,
                isSearch: false, // 是否显示搜索
            };
        },
        components: {
            headSearch
        },
        methods: {
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
                    }
                }
            }
        }
        &_nav {
            background: $bgc-theme;
            position: relative;
            overflow: hidden;
            &_ul {
                height: 60px;
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
                height: 320px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                &_li {
                    position: relative;
                    width: 31%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    /* 视频推荐 start */
                    .item_img {
                        position: relative;
                        flex-grow: 1;
                        box-shadow: 2px 2px 2px 5px rgba(3, 3, 3, .1);
                        border-radius: 10px;
                        ._img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                        }

                        ._txt {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            background: rgba(3, 3, 3, 0.6);
                            border-radius: 10px 0;
                            color: $color-default;
                            font-size: 28px;
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
</style>
