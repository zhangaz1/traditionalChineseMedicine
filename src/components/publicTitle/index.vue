<template>
    <div class="publicTitle">
        <van-sticky>
            <div class="publicTitle_box">
                <div class="publicTitle_box_arrowLeft" @click="goBack">
                    <van-icon name="arrow-left" />
                </div>
                <ul class="publicTitle_box_content">
                    <li class="li plr20"  @click="getCurrent(index)" v-for="(item, index) of navData" :key="'item' + index">{{item.txt}}</li>
                    <!--  :class="{active: current === index}"-->
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
            * 功能：{} 返回上一页
            * 参数：{}
            */
            goBack() {
                this.$router.go(-1);
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
