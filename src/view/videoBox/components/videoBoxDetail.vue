<template>
    <div class="videoBoxDetail ptb108">
        <van-nav-bar
                title=""
                left-text="小二推拿"
                left-arrow
                @click-left="onGoBack"
                fixed
                class="videoBoxDetail_title"
        />
        <div class="videoBoxDetail_top plr30 ptb30">
            <div class="videoBoxDetail_top_img mr30">
                <img src="https://www.zk120.com/media/widgets/banners/2020/03/190805112845859.20200310145039745.jpg" alt="" class="img">
            </div>
            <div class="videoBoxDetail_top_desc ptb20">
                <div class="title mb20">小儿推拿</div>
                <div class="txt ptb40">主讲：</div>
                <div class="btnBox">
                    <button type="button" class="btn ptb10 mr20 plr30" @click="_play">立即播放</button>
                    <button type="button" class="btn ptb10 plr30"  @click="_collection">收藏</button>
                </div>
            </div>
        </div>
        <div class="videoBoxDetail_content plr30 ptb30">
            <div class="videoBoxDetail_content_title ptb20 mb10">
                <div class="videoBoxDetail_content_title_img mr10">
                    <img src="http://www.51pptmoban.com/d/file/2014/01/24/a21ac1a1034f071c458b05ff431e5d6d.jpg" alt="" class="img">
                </div>
                <div class="videoBoxDetail_content_title_txt">选集播放</div>
            </div>
            <ul class="videoBoxDetail_content_obj">
                <router-link tag="li" :to="{path: '/', query: {id: 1}}" class="videoBoxDetail_content_obj_li ptb20 plr30 mb10">
                    <span class="num">第1集</span>
                    <span class="txt plr30">• • • 本集叙述详情 • • •</span>
                </router-link>
                <router-link tag="li" :to="{path: '/', query: {id: 1}}" class="videoBoxDetail_content_obj_li ptb20 plr30 mb10">
                    <span class="num">第1集</span>
                    <span class="txt plr30">• • • 本集叙述详情 • • •</span>
                </router-link>
                <router-link tag="li" :to="{path: '/', query: {id: 1}}" class="videoBoxDetail_content_obj_li ptb20 plr30 mb10">
                    <span class="num">第1集</span>
                    <span class="txt plr30">• • • 本集叙述详情 • • •</span>
                </router-link>
                <router-link tag="li" :to="{path: '/', query: {id: 1}}" class="videoBoxDetail_content_obj_li ptb20 plr30 mb10">
                    <span class="num">第1集</span>
                    <span class="txt plr30">• • • 本集叙述详情 • • •</span>
                </router-link>
            </ul>
            <div class="arrow_next">
                <van-icon name="arrow-down" class="arrow_next_icon" @click="page_next"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'videoBoxDetail',
        data() {
            return {

            };
        },
        methods: {
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
            * 功能：{}  立即播放
            * 参数：{}
            */
            _play() {

            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{} 收藏
            * 参数：{}
            */
            _collection() {

            },
            /* 2020/3/20
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            page_next() {
                console.log('获取下一个');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar__text,
    .van-nav-bar .van-icon {
        font-size: 48px;
        color: $color-default;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .videoBoxDetail {
        background: #fff;
        &_title {
            height: 108px;
            background: #f97e80;
        }
        &_top {
            display: flex;
            background: url('http://www.51pptmoban.com/d/file/2014/01/24/a21ac1a1034f071c458b05ff431e5d6d.jpg') no-repeat;
            background-size: 200% 200%;
            &_img {
                width: 350px;
                height: 320px;
                box-shadow: 10px 2px 20px 5px rgba(3, 3, 3, .4);
                border-radius: 10px;
                .img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                }
            }
            &_desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
                .title {
                    color: $color-default;
                    font-size: 48px;
                }
                .txt {
                    color: $color-default;
                    font-size: 35px;
                }
                .btnBox {
                    width: 100%;
                    .btn {
                        background: #f97e80;
                        border-radius: 50px;
                        color: $color-default;
                        box-shadow: 10px 2px 20px 5px rgba(3, 3, 3, .4);
                    }
                }
            }
        }
        &_content {
            background: $bgc-theme;
            &_title {
                display: flex;
                align-items: center;
                &_img {
                    width: 50px;
                    height: 50px;
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &_txt {
                    font-size: 40px;
                }
            }
            &_obj {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                &_li {
                    width: 80%;
                    background: #f6f6f6;
                    display: flex;
                    justify-content: space-around;
                    .num {
                        font-size: 30px;
                        font-weight: 600;
                    }
                    .txt {
                        @include ellipsis();
                        color: #767475;
                        font-size: 28px;
                    }
                }
            }
            .arrow_next {
                width: 100%;
                text-align: center;
                &_icon {
                    font-size: 48px;
                    color: $color_999;
                }
            }
        }
    }
</style>
