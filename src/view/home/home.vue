<template>
    <div class="home pb100">
        <van-sticky>
            <div class="home_sticky">
                <van-nav-bar
                        title="人身通考"
                        right-text="..."
                        @click-right="onClickRight"
                        class="mb20"
                />
                <headSearch
                        class="home_search"
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
                <ul class="home_dropDown" v-show="isShow">
                    <li class="home_dropDown_item pl100">
                        <van-icon name="browsing-history-o" />
                        <span class="txt">我的足迹</span>
                    </li>
                    <li class="home_dropDown_item pl100">
                        <van-icon name="star-o" />
                        <span class="txt">我的收藏</span>
                    </li>
                    <li class="home_dropDown_item pl100">
                        <van-icon name="share" />
                        <span class="txt ">分享好友</span>
                    </li>
                </ul>
            </div>
        </van-sticky>
        <publicSwipe heightVal="200">
            <van-swipe-item v-for="(image, index) in images" :key="index + 'image'"  class="home_swiper_item" slot="swiperItem">
                <img :src="image" class="img"/>
            </van-swipe-item>
        </publicSwipe>
        <subMenu class="plr30 bg_f" title="医案推荐榜" toRouter="/doctorCase">
            <ul class="home_nav ptb20" slot="content">
                <router-link :to="nav.url" class="home_nav_li mb20" v-for="(nav, index) of navData" :key="'nav' + index">
                    <p class="txt ptb10 plr20">{{nav.txt}}</p>
                </router-link>
            </ul>
        </subMenu>
        <subMenu class="plr30 bg_f" title="书籍推荐榜" toRouter="/book">
            <swiper class="swiper_common" :options="swiperBook" slot="content">
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
                <swiper-slide  class="swiper_common_item">
                    <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover0">
                        <div class="content_img_free"></div>
                        <div class="content_img_txt">
                            <div class="title">
                                <span class="name">景岳全书</span>一
                            </div>
                        </div>
                        <ul class="content_img_line">
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                            <li class="li"></li>
                        </ul>
                    </router-link>
                    <p class="content_img_title pl10">中医四大经典著作之一。</p>
                </swiper-slide>
            </swiper>
        </subMenu>
        <subMenu class="plr30 bg_f" title="视频推荐榜" toRouter="/videoBox">
            <swiper class="swiper_common" :options="swiperVideo" slot="content">
                <swiper-slide v-for="(image, index) in images" :key="index + index + image"  class="swiper_common_item">
                    <router-link to="/" class="swiper_common_item_link">
                        <div class="item_img">
                            <img :src="image" class="_img mb20"/>
                            <span class="_txt">小二推拿</span>
                        </div>
                        <p class="txt_title ptb20">小二推拿</p>
                    </router-link>
                </swiper-slide>
            </swiper>
        </subMenu>
        <copyright/>
    </div>
</template>

<script>
    import headSearch from '@/components/headSearch/';
    import publicSwipe from '@/components/publicSwipe/';
    import subMenu from './components/subMenu';
    import copyright from './components/copyright';
    import { navItem, swiperVideo, swiperBook } from './config';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name: 'home',
        data() {
            return {
                navData: navItem,
                swiperVideo,
                swiperBook,
                images: [
                    'https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg',
                    'https://www.zk120.com/media/widgets/banners/2020/03/190222160830508.20200310145039990.jpg',
                    'https://www.zk120.com/media/widgets/banners/2020/03/190222160830508.20200310145039990.jpg',
                    'https://www.zk120.com/media/widgets/banners/2020/03/190222160830508.20200310145039990.jpg',
                    'https://www.zk120.com/media/widgets/banners/2020/03/190222160830508.20200310145039990.jpg'
                ],
                isShow: false, // 是否显示顶部菜单
                isCancel: false,
                searchResultData: [], // 存储搜索结果
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
        methods: {
            searchVal(val) {
                console.log('搜索内容', val);
                if (val) {
                    this.searchResultData.push(val);
                }
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {}
             *参数:
             */
            onClickRight() {
                if (this.isShow) {
                    this.isShow = false;
                } else {
                    this.isShow = true;
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
        /*background:url('')*/
    }
    .van-nav-bar__text {
        color: $coloe_3;
    }
    .van-sticky {
    }
    .home {
        position: relative;
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
            justify-content: space-around;
            align-items: center;
            &_li {
                width: 20%;
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
            height: 280px;
            &_item {
                .content_img {
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
                .content_img_title {
                    @include multiline-ellipsis(2);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    font-size: 24px;
                    color: $color_666;
                    width: 100%;
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
                        flex-grow: 1;
                        ._img {
                            width: 100%;
                            height: 100%;
                        }
                        ._txt {
                            position: absolute;
                            right: 0;
                            bottom: 0;
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
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
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
