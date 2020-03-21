<template>
    <div class="videoBox ptb108">
        <van-nav-bar :title="title" left-arrow @click-right="onSearch"  @click-left="onGoBack" fixed class="videoBox_title">
            <van-icon name="search" slot="right" />
        </van-nav-bar>
        <div class="videoBox_nav mt20 mb20 plr30">
            <ul class="videoBox_nav_ul ptb20" :class="{_move: isMove}">
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
                <li class="videoBox_nav_ul_li mlr10 mb60">中医基础</li>
            </ul>
            <div class="videoBox_nav_mask" :class="{move: isMove}">
                <van-icon :name="iconName" class="videoBox_nav_mask_icon" @click="_animation" />
            </div>
        </div>
        <div class="videoBox_content plr30">
            <div class="videoBox_content_title ptb20">
                <div class="videoBox_content_video">视频内容</div>
                <div class="videoBox_content_num">共有41部</div>
            </div>
            <ul class="videoBox_content_item">
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb10"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb10"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
                <router-link :to="{path: '/videoBox/components/videoBoxDetail', query: {id: '1'}}" tag="li" class="videoBox_content_item_li mr20">
                    <div class="item_img">
                        <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" class="_img mb10"/>
                        <span class="_txt p8">小二推拿</span>
                    </div>
                    <p class="txt_title ptb20">小二推拿</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'videoBox',
        data() {
            return {
                title: '视频',
                isMove: false,
                iconName: 'arrow-down'
            };
        },
        methods: {
            /* 2020/3/20
            * 作者：王青高
            * 功能：{}  点击了搜索内容
            * 参数：{}
            */
            onSearch() {
                console.log('点击了搜索');
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{} 返回上一页
            * 参数：{}
            */
            onGoBack() {
                this.$router.go(-1);
            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{} 显示导航菜单
            * 参数：{}
            */
            _animation() {
                if (this.isMove) {
                    this.isMove = false;
                    this.iconName = 'arrow-down';
                } else {
                    this.isMove = true;
                    this.iconName = 'arrow-up';
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

        &_nav {
            background: $bgc-theme;
            position: relative;
            overflow: hidden;

            &_ul {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                height: 60px;
                transition: height .5s;

                &_li {
                    font-size: 28px;
                    color: $coloe_3;
                }
            }

            &_mask {
                position: absolute;
                background: $bgc-theme;
                width: 100%;
                height: 100%;
                left: 0;
                top: 50px;
                transition: top .5s;
                &_icon {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    font-size: 48px;
                    color: $coloe_3;
                    animation: tb_s .7s ease-in-out infinite;
                }
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
    .move {
        top: 80%;
    }
    ._move {
        height: 100%;
    }
    @keyframes tb_s {
        0% {
            position: absolute;
            top: 0;
        }
        100% {
            position: absolute;
            top: 10px;
        }
    }
</style>
