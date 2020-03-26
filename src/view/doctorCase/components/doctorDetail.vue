<template>
    <div class="doctorDetail ptb108 plr30" v-if="article">
        <van-nav-bar
            :fixed="true"
            :title="article.title"
            left-arrow
            @click-left="onClickLeft"
            class="doctorDetail_nav"
        />
        <div class="doctorDetail_box ptb30">
            <div class="doctorDetail_box_li mb30">
                <van-icon name="wap-home" class="mr20" />
                <span class="txt">医案 - </span>
                <span class="txt">分类 - </span>
                <span class="txt">内科 - </span>
                <span class="txt">{{article.title}}</span>
            </div>
            <div class="doctorDetail_box_content">
                <h2 class="title ptb20">{{article.description}}</h2>
                <p class="content ptb10" v-html="article.content"></p>
                <p class="content ptb10">欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。欢迎使用hello,world。</p>
            </div>
            <div class="doctorDetail_box_share ptb30 mtb100">
                <div @click="collection" class="collection ptb20 plr30 mb20">
                    <van-icon :name="icon" class="icon" /> |
                    <span class="txt">收藏</span>
                </div>
                <div class="share ptb30">
                    <!-- 分享按钮 -->
                    分享：
                    <vshare :vshareConfig="vshareConfig"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { getDoctorArticleDetail, addToCollectionInfo } from '@/api/content';
    import { EventBus } from "@/utils/event-bus";
    import { Toast } from 'vant';
    import vshare from 'vshare';
    export default {
        name: 'doctorDetail',
        data() {
            return {
                icon: 'like-o',
                vshareConfig: {
                    shareList: ['qzone', 'tsina', 'sqq', 'tieba', 'weixin', 'more'],
                    common: {
                        bdText: '',
                        bdDesc: '',
                        bdUrl: window.location.href,
                        bdPic: 'https://www.zk120.com/zixun/wp-content/uploads/2018/07/p.zk120.net_.cn_2018-07-05_17-59-10.png',
                    },
                    share: [{
                        bdSize: 32
                    }],
                    image: {
                        viewType: 'collection',
                        viewSize: 64
                    }
                },
                article: null // 存储文章详情
            };
        },
        beforeCreate(to, from , next) {
            window._bd_share_main = '';
        },
        components: {
            vshare
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {collection} 收藏
             *参数: 切换收藏图标
             */
            collection() {
                let id = this.article.id;
                addToCollectionInfo({ id }).then(res => {
                    if (res.state === '1') {
                        if (res.msg === '取消收藏成功!') {
                            this.icon = 'like-o';
                        } else {
                            this.icon = 'like';
                        }
                        Toast(res.msg);
                    }
                });
            },
            /** 2020-3-26 0026
             *作者:王青高
             *功能: 获取文章详情信息
             *参数: {id} 文章id
             */
            getDoctorArticleDetail(id) {
                getDoctorArticleDetail({ id }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.article = result.info;
                        // this.$set(this.article, ) = result.info;
                        this.$set(this.vshareConfig.common, 'bdText', this.article.title);
                        this.$set(this.vshareConfig.common, 'bdDesc', this.article.description);
                    };
                });
            }
        },
        created() {
            let obj = this.$route.query;
            this.getDoctorArticleDetail(obj.id);
        },
        mounted() {
            EventBus.$emit("isDisplay", { data: false });
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .van-nav-bar__arrow {
        font-size: 48px;
        color: $coloe_3;
    }
    .van-nav-bar {
        line-height: 108px;
    }
    .doctorDetail {
        &_nav {
            height: 108px;
        }
        &_box {
            width: 100%;
            height: 600px;
            &_li {
                display: flex;
                align-items: center;
                .txt {
                    display: inline-block;
                    font-size: 28px;
                    color: $color_999;
                }
            }
            &_content {
                font-size: 30px;
                color: $coloe_3;
                .title {
                    font-size: 60px;
                    border-bottom: 1px solid $ccc-color;
                }
                .content {
                    font-size: 30px;
                    line-height: 60px;
                }
            }
            &_share {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .collection {
                    width: 200px;
                    border: 1px solid #75a2e6;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .icon,.txt {
                        font-size: 30px;
                        color: $coloe_3;
                    }
                }
                .share {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>
