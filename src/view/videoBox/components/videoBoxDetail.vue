<template>
    <div class="videoBoxDetail ptb108">
        <van-nav-bar
                title=""
                :left-text="title"
                left-arrow
                @click-left="onGoBack"
                fixed
                class="videoBoxDetail_title"
        />
        <div class="videoBoxDetail_top plr30 ptb30" v-if="vedio">
            <div class="videoBoxDetail_top_img mr30">
                <img :src="vedio.cover" alt="" class="img">
            </div>
            <div class="videoBoxDetail_top_desc ptb20">
                <div class="title mb20">{{vedio.title}}</div>
                <div class="txt ptb40">主讲：{{vedio.author}}</div>
                <div class="btnBox">
                    <button type="button" class="btn ptb10 mr20 plr30" @click="_play">立即播放</button>
                    <button type="button" class="btn ptb10 plr30"  @click="_collection"><van-icon :name="icon" class="icon pr10" /> | 收藏</button>
                </div>
            </div>
        </div>
        <div class="videoBoxDetail_content plr30 ptb30">
            <div class="videoBoxDetail_content_title ptb20 mb20">
                <div class="videoBoxDetail_content_title_img mr10">
                    <img :src="require('../../../assets/img/videoImg.png')" alt="" class="img">
                </div>
                <div class="videoBoxDetail_content_title_txt">选集播放</div>
            </div>
            <ul class="videoBoxDetail_content_obj">
                <router-link tag="li" v-for="(video, index) of vediolist" :key="'video' + index" :to="{path: '/videoBox/components/videoBoxTxt', query: {id: video.id}}" class="videoBoxDetail_content_obj_li ptb20 plr30 mb20">
                    <span class="num">第{{video.id}}集</span>
                    <span class="txt plr30">• • • {{video.title}} • • •</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import { getVedioList, addToCollectionVedio  } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { Toast } from 'vant';
    export default {
        name: 'videoBoxDetail',
        data() {
            return {
                vedio: null, // 当前视频内容
                vediolist: [], // 当前视频目录
                title: '', // 导航栏标题
                icon: 'like-o',
            };
        },
        mounted() {
            let id = this.$route.query.id;
            if (id) {
                this.getVedioList(id);
            } else {
                this.$router.push('/videoBox');
            }
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 点击视频获取内容和目录
            * 参数：{}
            */
            getVedioList(id) {
                getVedioList({ id }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.vediolist = result.vediolist;
                        this.vedio = result.vedio;
                        this.title = this.vedio.title;
                        if (result.isCollection === 1) {
                            this.icon = 'like';
                        }
                    } else {
                        Toast('数据获取失败，请刷新重试!');
                        setTimeout(() => {
                            this.$router.push('/videoBox');
                        }, 3000);
                    }
                });
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {collection} 收藏
             *参数: 切换收藏图标
             */
            _collection() {
                let id = this.vedio.id;
                addToCollectionVedio({ id }).then(res => {
                    if (res.state === '1') {
                        if (res.msg === '取消收藏成功!') {
                            this.icon = 'like-o';
                        } else {
                            this.icon = 'like';
                        }
                        Toast(res.msg);
                    } else {
                        Toast(res.msg);
                    }
                });
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
            * 功能：{}  立即播放
            * 参数：{}
            */
            _play() {
                this.$router.push({ path: '/videoBox/components/videoBoxTxt', query: { id: this.vedio.id } });
            },
            /** 2020/3/20
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
                    display: flex;
                    .btn {
                        background: #f97e80;
                        border-radius: 50px;
                        color: $color-default;
                        box-shadow: 10px 2px 20px 5px rgba(3, 3, 3, .4);
                        @include flex-center();
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
                    font-size: 35px;
                    font-weight: 600;
                }
            }
            &_obj {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-height: 600px;
                overflow-y: scroll;
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
