<template>
    <div class="article_item plr30">
        <div class="tips ptb20">找到 5 条结果</div>
        <div class="content pl160 ptb20">
            <div class="content_img">
                <img class="img" src="https://www.zk120.com/zixun/wp-content/themes/HuXiu/timthumb.php?src=https://www.zk120.com/zixun/wp-content/uploads/2018/11/zk120.com_2019-03-01_13-28-29.jpg&h=125.2&w=220&zc=1" alt="">
            </div>
            <div class="content_txt pl120">
                <p class="digest">全文：素问 重广补注黄帝内经素问·序 启玄子王冰撰夫释缚脱艰，全 ...</p>
                <p class="time ptb20">2018-09-18 09:18</p>
            </div>
        </div>
        <div class="content pl160 ptb20">
            <div class="content_img">
                <img class="img" src="https://www.zk120.com/zixun/wp-content/themes/HuXiu/timthumb.php?src=https://www.zk120.com/zixun/wp-content/uploads/2018/11/zk120.com_2019-03-01_13-28-29.jpg&h=125.2&w=220&zc=1" alt="">
            </div>
            <div class="content_txt pl120">
                <p class="digest">全文：素问 重广补注黄帝内经素问·序 启玄子王冰撰夫释缚脱艰，全 ...</p>
                <p class="time ptb20">2018-09-18 09:18</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'articleList'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .article {
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
