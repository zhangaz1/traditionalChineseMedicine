<template>
    <div class="bookContentFeed pb100">
        <van-sticky>
            <div class="bookContentFeed_sticky">
                <van-nav-bar
                        :title="title"
                        right-text="..."
                        left-arrow
                        @click-left="onGoBack"
                        class="bookContentFeed_title"
                >
                    <template #right>
                        <van-icon name="search" class="mr20" @click="onSearch"/>
                        <van-icon name="ellipsis" @click="onClickRight"/>
                    </template>
                </van-nav-bar>
                <ul class="bookContentFeed_sticky_nav mtb10">
                    <router-link tag="li" to="/" class="li">推荐</router-link>
                    <router-link tag="li" to="/doctorCase" class="li">古典分类</router-link>
                    <router-link tag="li" to="/myBookBox" class="li">我的书架</router-link>
                </ul>
                <ul class="bookContentFeed_title_dropDown" v-show="isShow">
                    <li class="bookContentFeed_title_dropDown_item pl100">
                        <van-icon name="browsing-history-o" />
                        <span class="txt">我的足迹</span>
                    </li>
                    <li class="bookContentFeed_title_dropDown_item pl100">
                        <van-icon name="star-o" />
                        <span class="txt">我的收藏</span>
                    </li>
                    <li class="bookContentFeed_title_dropDown_item pl100">
                        <van-icon name="share" />
                        <span class="txt ">分享好友</span>
                    </li>
                </ul>
            </div>
        </van-sticky>
        <div class="bookContentFeed_book">
            <div class="plr30">
                <div class="content pl160 ptb20">
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
                    <router-link tag="div" :to="{path: '/bookDetail', query: {id: '1'}}" class="content_txt">
                        <div class="title mb20">景岳全书(一)</div>
                        <p class="author mb10">明·张景岳</p>
                        <p class="description">首创方药八阵法的医学全书。</p>
                    </router-link>
                </div>
            </div>
            <ul class="summary">
                <li class="li"
                    @click="getCurrent(index)"
                    :class="{active: current === index}"
                    v-for="(nav, index) of navItem">{{nav.name}}</li>
            </ul>
            <div class="article plr30 ptb40 mb20" :class="{pull: isPull}" v-if="current === 0">
                <p class="article_p" :class="{pull: isPull}">《素问》，又名《黄帝内经素问》，相传为黄帝创作，大约成书于春秋战国时期。原来9卷，后经唐王冰订补，改编为24卷，计81篇，定名为《黄帝内经素问》，所论内容十分丰富，以人与自然统一观、阴阳学说、五行说、脏腑经络学为主线，论述摄生、脏腑、经络、病因、病机、治则、药物以及养生防病等各方面的关系，集医理、医论、医方于一体，保存了《五色》、《脉变》、《上经》、《下经》、《太始天元册》等20多种古代医籍，突出阐发了古代的哲学思想，强调了人体内外统一的整体观念，从而成为中医基本理论的渊源。</p>
                <span class="article_arrow" @click="pullArrow" :class="{arrowDeg: isPull}"></span>
            </div>
            <div class="directory plr30 ptb40 mb20" v-else-if="current === 1">
                <ul class="_one">
                    <router-link :to="{path: '/', query: {id: 1}}" class="_one_li pl20 ptb20">素问
                        <ul class="_two">
                            <router-link :to="{path: '/', query: {id: 1}}" class="_two_li pl20 ptb20">重广补注黄帝内经素问•序</router-link>
                            <router-link :to="{path: '/', query: {id: 1}}" class="_two_li pl20 ptb20">重广补注黄帝内经素问•序</router-link>
                            <router-link :to="{path: '/', query: {id: 1}}" class="_two_li pl20 ptb20">目录</router-link>
                            <router-link :to="{path: '/', query: {id: 1}}" class="_two_li pl20 ptb20">卷第一
                                <ul class="_three">
                                    <router-link :to="{path: '/', query: {id: 1}}" class="_three_li pl20 ptb20">上古天真论篇第一</router-link>
                                    <router-link :to="{path: '/', query: {id: 1}}" class="_three_li pl20 ptb20">上古天真论篇第一</router-link>
                                    <router-link :to="{path: '/', query: {id: 1}}" class="_three_li pl20 ptb20">上古天真论篇第一</router-link>
                                    <router-link :to="{path: '/', query: {id: 1}}" class="_three_li pl20 ptb20">上古天真论篇第一</router-link>
                                    <router-link :to="{path: '/', query: {id: 1}}" class="_three_li pl20 ptb20">上古天真论篇第一</router-link>
                                </ul>
                            </router-link>
                        </ul>
                    </router-link>
                </ul>
            </div>
            <subMenu class="plr30 bg_f" title="中医经典推荐" toRouter="/searchResult">
                <swiper class="swiper" :options="bookContentFeedConfig" slot="content">
                    <swiper-slide class="swiper_common">
                        <div class="content ptb20">
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
                            <p class="content_img_title">中医四大经典著作之一。</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="swiper_common">
                        <div class="content ptb20">
                            <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover1">
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
                            <p class="content_img_title">中医四大经典著作之一。</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="swiper_common">
                        <div class="content ptb20">
                            <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover2">
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
                            <p class="content_img_title">中医四大经典著作之一。</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="swiper_common">
                        <div class="content ptb20">
                            <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover3">
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
                            <p class="content_img_title">中医四大经典著作之一。</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="swiper_common">
                        <div class="content ptb20">
                            <router-link tag="div" :to="{path: '/bookContentFeed', query: {id: '1'}}" class="content_img sprite-book-cover4">
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
                            <p class="content_img_title">中医四大经典著作之一。</p>
                        </div>
                    </swiper-slide>
                </swiper>
            </subMenu>
            <subMenu class="plr30 bg_f" title="与素问相关的方剂" toRouter="/searchResult">
                <ul class="group-content" slot="content">
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                    <li class="li mr20 mb20">
                        <div class="border-wapper">
                            <div class="border">
                                <span class="txt">兰草汤</span>
                                <div class="b_c_l"><span class="b_b_l"></span> <span class="b_i_l"></span></div>
                                <div class="b_c_r"><span class="b_b_r"></span> <span class="b_i_r"></span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </subMenu>
        </div>
        <ul class="footerFix">
            <router-link to="/" class="footerFix_link">
                <span class="footerFix_link_add mr20"></span>
                <span class="footerFix_link_bookshelf">加入书架</span>
            </router-link>
            <router-link to="/" class="footerFix_link">
                <span class="footerFix_link_read mr20"></span>
                <span class="footerFix_link_bookshelf">阅读</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import subMenu from './components/subMenu';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { bookContentFeedConfig } from './config';
    export default {
        name: 'bookContentFeed',
        data() {
            return {
                isShow: false, // 默认不显示菜单
                title: '古籍',
                bookContentFeedConfig,
                navItem: [
                    {
                        "name": '内容提要'
                    },
                    {
                        "name": '目录'
                    }
                ],
                current: 0,
                isPull: false // 向下、向上
            };
        },
        components: {
            subMenu,
            swiper,
            swiperSlide
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
                if (this.isShow) {
                    this.isShow = false;
                } else {
                    this.isShow = true;
                }
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch() {
                console.log('点击了搜索');
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} getCurrent 获取当前焦点，并向父组件传送
             * 参数：{} index 当前索引
             */
            getCurrent(index) {
                console.log(this.current);
                this.current = index;
            },
            /** 2020/3/23
            * 作者：王青高
            * 功能：{} 向下拉动
            * 参数：{}
            */
            pullArrow() {
                if (this.isPull) {
                    this.isPull = false;
                } else {
                    this.isPull = true;
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
    .bookContentFeed {
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
        &_book {
            background: $bgc-theme;
            .content {
                position: relative;
                border-bottom: 1px solid #eee;
                &_img {
                    position: absolute;
                    left: 0;
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
                        color: $coloe_3;
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
                }
            }
            .summary {
                width: 100%;
                @include flex-center();
                height: 80px;
                .li {
                    @include flex-center();
                    width: 50%;
                    height: 80px;
                    font-size: 28px;
                    color: $coloe_3;
                    position: relative;
                }
            }
            .article {
                position: relative;
                font-size: 28px;
                color: $coloe_3;
                line-height: 2;
                text-indent: 50px;
                height: 200px;
                transition: all 1s;
                overflow: hidden;
                &_p {
                    overflow: hidden;
                    height: 200px;
                    transition: all 1s;
                }
                &_arrow {
                    position: absolute;
                    left: calc(50% - 7px);
                    width: 14px;
                    height: 14px;
                    border-top: 4px solid $coloe_3;
                    border-right: 4px solid $coloe_3;
                    transform: rotate(135deg);
                    transition: all 1s;
                }
            }
            .swiper {
                height: 300px;
                .content {
                    height: 240px;
                    width: 150px;
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
            }
            .group-content {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .li {
                    width: 31%;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    .border-wapper {
                        display: block;
                        width: 100%;
                        padding: 0 14px;
                        box-sizing: border-box;
                        .border {
                            width: 100%;
                            height: 60px;
                            font-size: 28px;
                            line-height: 60px;
                            text-align: center;
                            border-radius: 12px;
                            padding: 0 8px;
                            box-sizing: border-box;
                            position: relative;
                            background-color: #fef7ef;
                            color: $coloe_3;
                            &:before {
                                content: "";
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 200%;
                                height: 200%;
                                border: 1px solid #ceb58f;
                                border-radius: 28px;
                                transform-origin: 0 0;
                                transform: scale(0.5, 0.5);
                                box-sizing: border-box;
                            }
                            .txt {
                                @include ellipsis();
                                width: 100%;
                                display: inline-block;
                            }
                            .b_c_r,
                            .b_c_l {
                                width: 16px;
                                height: 36px;
                                position: absolute;
                                top: 12px;
                                background-color: #fef7ef;
                                z-index: 3;
                                border-top-left-radius: 48px;
                                border-bottom-left-radius: 48px;
                            }
                            .b_c_l {
                                left: -14px;
                            }
                            .b_c_r {
                                right: -14px;
                            }
                            .b_b_l, .b_b_r {
                                display: block;
                                width: 100%;
                                height: 100%;
                                overflow: hidden;
                                position: relative;
                            }
                            .b_b_l {
                                &:before {
                                    content: "";
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 48px;
                                    height: 72px;
                                    transform-origin: 0 0;
                                    transform: scale(0.5, 0.5);
                                    box-sizing: border-box;
                                    z-index: 3;
                                    border-top-left-radius: 36px;
                                    border-bottom-left-radius: 36px;
                                    border: 1px solid #ceb58f;
                                    border-right: 0;
                                }
                            }
                            .b_b_r {
                                &:before {
                                    content: "";
                                    position: absolute;
                                    left: -4px;
                                    top: 0;
                                    width: 40px;
                                    height: 72px;
                                    transform-origin: 0 0;
                                    transform: scale(0.5,0.5);
                                    box-sizing: border-box;
                                    z-index: 3;
                                    border-top-right-radius: 36px;
                                    border-bottom-right-radius: 36px;
                                    border: 1px solid #ceb58f;
                                    border-left: 0;
                                }
                            }
                            .b_i_l {
                                display: block;
                                width: 24px;
                                height: 24px;
                                position: absolute;
                                left: 6px;
                                top: 6px;
                                background: url(../../assets/img/content_left.png) center center no-repeat;
                                background-size: 24px 24px;
                            }
                            .b_i_r {
                                display: block;
                                width: 24px;
                                height: 24px;
                                position: absolute;
                                right: 6px;
                                top: 6px;
                                background: url(../../assets/img/content_right.png) center center no-repeat;
                                background-size: 24px 24px;
                            }
                        }
                    }

                }
            }
            .directory {
                ._three_li,
                ._two_li,
                ._one_li {
                    @include ellipsis();
                }
            }
        }
        .footerFix {
            position: fixed;
            left: 0;
            width: 100%;
            bottom: 0;
            z-index: 9999999;
            display: flex;
            align-items: center;
            height: 80px;
            border-top: 1px solid $bg_ddcdaf;
            background: $bgc-theme;
            &_link {
                @include flex-center();
                width:50%;
                height: 100%;
                &:first-child {
                    border-right: 1px solid $bg_ddcdaf;
                }
                &_read,
                &_add {
                    display: inline-block;
                    width: 34px;
                    height: 34px;
                }
                &_add {
                    background: url(../../assets/img/addbook.png);
                    background-repeat: no-repeat;
                    background-size: 100%;
                }
                &_read {
                    background: url(../../assets/img/readbook.png);
                    background-repeat: no-repeat;
                    background-size: 100%;
                }
                &_bookshelf {
                    color: $color;
                }
            }
        }
    }
    .pull {
        height: 500px !important;
        overflow-y:scroll !important;;
    }
    .active:after {
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 2px;
        background: $bg_a33823;
    }
    .arrowDeg {
        transform: rotate(-45deg) !important;
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
