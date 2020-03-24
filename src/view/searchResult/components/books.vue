<template>
    <div class="searchResult_item plr30">
        <div class="tips ptb20">找到 5 条结果</div>
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
            <router-link tag="div" :to="{path: '/bookDetail', query: {id: '1'}}" class="content_txt pl20">
                <div class="title mb20">景岳全书(一)</div>
                <p class="author mb10">明·张景岳</p>
                <p class="description">首创方药八阵法的医学全书。</p>
                <p class="digest">全文：素问 重广补注黄帝内经素问·序 启玄子王冰撰夫释缚脱艰，全 ...</p>
            </router-link>
        </div>
        <div class="content pl160 ptb20">
            <div class="content_img sprite-book-cover1">
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
            </div>
            <div class="content_txt pl20">
                <div class="title mb20">景岳全书(一)</div>
                <p class="author mb10">明·张景岳</p>
                <p class="description">首创方药八阵法的医学全书。</p>
                <p class="digest">全文：素问 重广补注黄帝内经素问·序 启玄子王冰撰夫释缚脱艰，全 ...</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'books'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .searchResult {
        &_item {
            background: $bgc-theme;
            position: relative;
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
                        @include ellipsis();
                        font-size: 24px;
                        line-height: 44px;
                        color: $color_666;
                    }
                    .digest {
                        @include multiline-ellipsis(2);
                        font-size: 28px;
                        color: $coloe_3;
                        line-height: 1.5;
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
