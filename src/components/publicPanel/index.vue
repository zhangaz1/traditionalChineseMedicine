<template>
    <ul class="library_list ptb20">
        <li
                class="library_list_li ptb10 mb30 plr20 mr30"
                v-for="(list, index) of listData"
                :key="'list' + index"
                :class="{_active: currentColor === index}"
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
            listData: {
                type: [Array, Object],
                default() {
                    return [];
                }
            },
            notJump: {
                type: Boolean,
                defalut: false
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
                this.$emit('switchTab', data, this.notJump);
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
            min-width: 20%;
            border: 1px solid $color;
            background: #fefff9;
            border-radius: 60px;
            text-align: center;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
    ._active {
        color: $color;
    }
</style>
