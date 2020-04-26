<template>
    <ul class="library_list ptb20">
        <li
                class="library_list_li ptb10 mb30 plr20 mlr10"
                v-for="(list, index) of listData"
                :key="'list' + index"
                :class="{_active: currentColor === index && isActive}"
                @click="switchTab(list, index)"
        >{{list.title}}</li>
    </ul>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                currentColor: 0 //
            };
        },
        props: {
            listData: { // 数据
                type: [Array, Object],
                default() {
                    return [];
                }
            },
            isActive: { // 是否显示焦点
                type: Boolean,
                default: true
            }
        },
        methods: {
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {} 向父级传送当前点击的数据
             *参数: {objdect, number} data:当前点击的类目或菜单， index: 点击的下标
             */
            switchTab(data, index) {
                this.currentColor = index;
                this.$emit('switchTab', data);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .title {
        color: $color;
        text-align: left;
        font-size: 28px;
    }
    .library_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        &_li {
            @include ellipsis();
            min-width: 30%;
            border: 1px solid $color;
            background: #fefff9;
            border-radius: 60px;
            text-align: center;
            box-sizing: border-box;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
    ._active {
        color: $color;
    }
</style>
