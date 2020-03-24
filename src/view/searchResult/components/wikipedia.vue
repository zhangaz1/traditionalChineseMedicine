<template>
    <div class="doctorBook_item">
        <div class="tips ptb20 plr30">找到 <span class="num">1</span> 条结果</div>
        <div class="plr30 ptb20 content">
            <div class="title ptb10 mb20">鼻窦炎</div>
            <div class="desc">鼻渊指鼻腔时流浊涕的病证，俗名脑漏，临床可分之为急性、慢性。急性多有恶寒发热、头痛鼻塞等表证。慢性则病期较长，症现鼻塞，频流浊涕而气臭，嗅觉明显减退，头额胀痛等。鼻窦有炎症可通过各种途径引起临近组织和器官产生并发症。</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wikipedia'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .doctorBook {
        &_item {
            background: $bgc-theme;
            position: relative;
            width: 100%;
            .tips {
                position: relative;
                text-align: center;
                .num {
                    color: $color;
                }
                &:after {
                    content: '';
                    position: absolute;
                    left: 30px;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
                &:before {
                    content: '';
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    border: 1px dotted $ccc-color;
                    width: 30%;
                }
            }
            .content {
                position: relative;
                &:after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background: $ccc-color;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                &:before {
                    content: '';
                    position: absolute;
                    font-size: 48px;
                    color: $coloe_3;
                    right: 30px;
                    top: calc(50% - .07rem);
                    width: 14px;
                    height: 14px;
                    border-top: 4px solid #ccc;
                    border-right: 4px solid #ccc;
                    transform: rotate(45deg);
                }
                .title {
                    @include ellipsis();
                    font-size: 32px;
                    color: $color;
                }
                .desc {
                    @include multiline-ellipsis(2);
                    font-size: 28px;
                    color: $color_666;
                    line-height: 1.5;
                }
            }
        }
    }
</style>
