<template>
    <div class="article_item plr30"  @scroll.stop="addScroll($event)">
        <div class="tips ptb20">找到 {{searchData.length}} 条结果</div>
        <div v-if="searchData.length">
            <router-link tag="div" :to="{path: '/videoBox/components/videoBoxDetail', query: { id: item.id, title: searchValue }}" class="content pl250 ptb20" v-for="(item, index) of searchData" :key="'item' + index">
                <div class="content_img">
                    <img class="img" :src="isImg(item.cover)" alt="">
                </div>
                <div class="content_txt pl20">
                    <p class="digest" v-html="ruleTitle(item.title, searchValue)"></p>
                    <p class="time ptb20">{{item.updatetime}}</p>
                </div>
            </router-link>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'videoList',
        data() {
            return {
                defaultImg: require('../../../assets/img/no_img.jpg')
            };
        },
        props: {
            searchData: {
                type: [Array, Object],
                default() {
                    return [];
                }
            },
            totalcount: {
                type: Number,
                default: 0
            },
            searchValue: {
                type: String,
                default: ''
            }
        },
        computed: {
            isImg() {
                return function (img) {
                    if (img) {
                        return img;
                    } else {
                        return this.defaultImg;
                    }
                };
            },
            ruleTitle
        },
        methods: {
            /** 2020/3/30
             * 作者：王青高
             * 功能：{} 监听滚动条是否触底
             * 参数：{}
             */
            addScroll(event) {
                if (this.totalcount === this.searchData.length) return;
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.$emit('isScroll');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .article {
        &_item {
            background: $bgc-theme;
            position: relative;
            height: 100vh;
            overflow-y: scroll;
            .tips {
                position: relative;
                width: 100%;
                text-align: center;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0%;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 0%;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
            }
            .content {
                position: relative;
                border-bottom: 1px solid #eee;
                height: 150px;
                &_img {
                    position: absolute;
                    left: 10px;
                    top: 20px;
                    width: 240px;
                    height: 150px;
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &_txt {
                    position: relative;
                    .digest {
                        @include multiline-ellipsis(2);
                        font-size: 28px;
                        color: $coloe_3;
                        line-height: 1.5;
                    }
                    .time {
                        color: $color_999;
                        font-size: 24px;
                    }
                }
            }
        }
    }
</style>
