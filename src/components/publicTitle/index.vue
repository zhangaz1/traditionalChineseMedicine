<template>
    <div class="publicTitle">
        <van-sticky>
            <div class="publicTitle_box">
                <div class="publicTitle_box_arrowLeft" @click="goBack">
                    <van-icon name="arrow-left" v-if="_left"/>
                </div>
                <ul class="publicTitle_box_content">
                    <li class="li plr20" :class="{active: current === index && _active}"  @click="getCurrent(index)" v-for="(item, index) of navData" :key="'item' + index">{{item.txt}}</li>
                </ul>
                <slot name="publicTitleRight"></slot>
            </div>
        </van-sticky>
    </div>
</template>

<script>

    export default {
        name: 'index',
        data() {
            return {
                current: 0
            };
        },
        props: {
            navData: {
                type: Array,
                default() {
                    return [];
                }
            },
            _active: {
                type: Boolean,
                defalut: false
            },
            _left: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /** 2020/3/19
            * 作者：王青高
            * 功能：{} getCurrent 获取当前焦点，并向父组件传送
            * 参数：{} index 当前索引
            */
            getCurrent(index) {
                this.current = index;
                this.$emit('getCurrent', index);
            },
            /** 2020/3/19
            * 作者：王青高
            * 功能：{} 向父组件传递 返回上一页
            * 参数：{}
            */
            goBack() {
                if (this._left) this.$emit('goback');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .publicTitle {
        position:fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 108px;
        z-index: $search-z-index;
        background: $bgc-theme;
        border-bottom: 1px solid $ccc-color;
        .publicTitle_box {
            display: flex;
            align-items: center;
            height: 108px;
            &_content {
                height: 100%;
                width: 80%;
                white-space: nowrap;
                overflow-x: scroll;
                text-align: center;
                .li {
                    display: inline-block;
                    height: 100%;
                    line-height: 108px;
                    position: relative;
                    font-size: 32px;
                }
            }
            &_arrowLeft {
                width: 100px;
                height: $size;
                font-size: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    .active:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        top: 60%;
        right: 0;
        margin: auto;
        width: 50%;
        background: $color;
        height: 6px;
    }
</style>
