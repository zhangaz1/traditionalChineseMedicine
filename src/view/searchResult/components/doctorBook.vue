<template>
    <div class="doctorBook_item">
        <div class="tips ptb20 plr30">找到 5 条结果</div>
        <div class="plr30 ptb20 content">
            <div class="title ptb10">鼻渊 副鼻窦炎 | 程莘农</div>
            <div class="desc ptb10"><span class="desc_t">【证候表现】</span>经常鼻流黄涕十余年。</div>
            <div class="provenance ptb10"><span class="provenance_t">【出处】</span>《世中联名老中医典型医案》</div>
        </div>
        <div class="plr30 ptb20 content">
            <div class="title ptb10">鼻渊 副鼻窦炎 | 程莘农</div>
            <div class="desc ptb10"><span class="desc_t">【证候表现】</span>经常鼻流黄涕十余年。</div>
            <div class="provenance ptb10"><span class="provenance_t">【出处】</span>《世中联名老中医典型医案》</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dockerBook'
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
                    font-size: 28px;
                    color: $coloe_3;
                }
                .provenance,
                .desc {
                    @include ellipsis();
                    font-size: 28px;
                    color: $coloe_3;
                    &_t {
                        color: $color_999;
                    }
                }
            }
        }
    }
</style>
