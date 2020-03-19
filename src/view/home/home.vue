<template>
    <div class="home ptb108">
        <van-sticky>
            <headSearch
                    class="home_search"
                    @searchVal="searchVal"
                    @onEmail="onEmail"
            />
        </van-sticky>
        <publicSwipe heightVal="200">
            <van-swipe-item v-for="(image, index) in images" :key="index + 'image'"  class="home_swiper_item" slot="swiperItem">
                <img :src="image" class="img"/>
            </van-swipe-item>
        </publicSwipe>
        <subMenu class="plr30 bg_f" title="医案推荐榜">
            <ul class="home_nav ptb20" slot="content">
                <router-link :to="nav.url" class="home_nav_li mb20" v-for="(nav, index) of navData" :key="'nav' + index">
                    <p class="txt ptb10 plr20">{{nav.txt}}</p>
                </router-link>
            </ul>
        </subMenu>
        <subMenu class="plr30 bg_f" title="书籍推荐榜">
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
        <subMenu class="plr30 bg_f" title="视频推荐榜">
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
                swiperOption: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .home {
        background: #f3f2eb;
        position: relative;
        &_search {
            position:fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 108px;
            z-index: $search-z-index;
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
