<template>
    <div class="home pb100">
        <van-sticky>
            <div class="home_sticky">
                <van-nav-bar
                        title="人身通考"
                        right-text="..."
                        @click-right="onClickRight"
                        class="mb10"
                />
                <headSearch
                        class="home_search"
                        @searchVal="searchVal"
                        @onEmail="onEmail"
                />
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
                <swiper-slide v-for="(image, index) of images" :key="'image' + index"  class="swiper_common_item">
                    <router-link to="/" class="swiper_common_item_link">
                        <div class="item_img">
                            <img :src="image" class="img mb10"/>
                            <img :src="image" alt="" class="icon">
                        </div>
                        <p class="txt">中医四大经典著作之一</p>
                    </router-link>
                </swiper-slide>
            </swiper>
        </subMenu>
        <subMenu class="plr30 bg_f" title="视频推荐榜" toRouter="/videoBox">
            <swiper class="swiper_common" :options="swiperVideo" slot="content">
                <swiper-slide v-for="(image, index) in images" :key="index + index + image"  class="swiper_common_item">
                    <router-link to="/" class="swiper_common_item_link">
                        <div class="item_img">
                            <img :src="image" class="_img mb10"/>
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
    import { navItem, swiperVideo, swiperBook} from './config';
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
                isShow: false // 是否显示顶部菜单
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
            },
            onEmail() {
                console.log('点击了邮箱');
            },
            /** 2020-3-19 0019
             *作者:青型科技
             *功能:
             *参数:
             */
            onClickRight() {
                if (this.isShow) {
                    this.isShow = false;
                } else {
                    this.isShow = true;
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
        background: #f3f2eb;
    }
    .home {
        background: #f3f2eb;
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
            height: 320px;
            &_item {
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

</style>
