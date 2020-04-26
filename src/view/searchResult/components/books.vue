<template>
    <div class="searchResult_item plr30" @scroll.stop="addScroll($event)">
        <div class="tips ptb20">找到 {{searchData.length}} 条结果</div>
        <div v-if="searchData.length">
            <div class="content pl160 ptb20" v-for="(item, index) of searchData" :key="'item' + index">
                <router-link tag="div" :to="{path: '/bookContentFeed', query: { id: item.id, title: searchValue }}" class="content_img mb10" :style="{backgroundImage: 'url(' + isImg(item.cover) + ')', backgroundSize: '100% 100%' }">
                    <div class="content_img_free" v-if="item.isfree === '1'"></div>
                </router-link>
                <div @click.stop="openContentFeed(item.id)" class="content_txt pl20 ptb10">
                    <div class="title mb20" v-html="ruleTitle(item.title, searchValue)"></div>
                    <p class="author mb10" v-html="ruleTitle(item.author, searchValue)"></p>
                    <p class="description" v-html="ruleTitle(item.description, searchValue)"></p>
                    <p class="digest" @click.stop="openDetail(item.id)" v-html="ruleTitle(item.content, searchValue)" v-if="item.content"></p>
                    <p class="digest" v-else style="color: #de181b;">此书籍内容有涉及'{{searchValue}}'</p>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { ruleTitle } from '@/utils/searchVal';
    export default {
        name: 'books',
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
            /** 2020-4-15 0015
             *作者:王青高
             *功能: 跳转内容详情
             *参数:
             */
            openDetail(id) {
                this.$router.push({ path: '/bookDetail', query: { bookId: id, title: this.searchValue, isSearch: true } });
            },
            /** 2020-4-15 0015
             *作者:王青高
             *功能: 跳转内容提要
             *参数:
             */
            openContentFeed(id) {
                this.$router.push({ path: '/bookContentFeed', query: { id: id, title: this.searchValue } });
            },
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
        },
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .searchResult {
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
                /*width: 100%;*/
                height: 200px;
                &_img {
                    position: absolute;
                    left: 10px;
                    top: 20px;
                    width: 150px;
                    height: 200px;
                    &_free {
                        display: block;
                        width: 28px;
                        height: 28px;
                        background: url(../../../assets/img/free_icon.png) center center no-repeat;
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
                        @include ellipsis();
                        font-size: 28px;
                        line-height: 28px;
                        color: $color;
                    }
                    .author {
                        height: 24px;
                        font-size: 24px;
                        line-height: 24px;
                        color: $color_999;
                    }
                    .description {
                        @include multiline-ellipsis(2);
                        font-size: 28px;
                        line-height: 1.5;
                        color: $color_666;
                    }
                    .digest {
                        @include multiline-ellipsis(2);
                        font-size: 24px;
                        color: $coloe_3;
                    }
                }
            }
        }
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
