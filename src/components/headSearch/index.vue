<template>
    <div class="headSerach">
        <van-search
                v-model="searchVal"
                shape="round"
                class="headSerach_search"
                background="#fff"
                :show-action="isCancel"
                placeholder="请输搜索关键字"
                maxlength="20 "
                @input="getSearchVal"
                @cancel="onCancel"
                @focus="focus"
                @clear="_clear"
        />
        <slot name="searchContent"></slot>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                searchVal: this._searchVal,
                timer: null
            };
        },
        methods: {
            getSearchVal() {
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$emit('searchVal', this.searchVal);
                }, 500);
            },
            onCancel() {
                this.$emit('cancel');
            },
            /** 2020/3/24
            * 作者：王青高
            * 功能：{}
            * 参数：{}
            */
            focus() {
                this.$emit('focus');
            },
            /** 2020/3/24
            * 作者：王青高
            * 功能：{} 点击清除按钮触发
            * 参数：{}
            */
            _clear() {
                this.$emit('_clear');
            }
        },
        props: {
            _searchVal: {
                type: String,
                default: ''
            },
            isCancel: {
                type: Boolean,
                default: false // 是否显示右侧取消按钮
            }
        },
        watch: {
            _searchVal(val) {
                this.searchVal = val;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .van-search__content {
        background-color: #f3f2ed;
    }
    .van-field__left-icon .van-icon {
        font-size: 48px;
    }
    .headSerach {
        background: #fff;
        display: flex;
        align-items: center;
        &_search {
            flex-grow:1;
        }
        &_icon {
            font-size: 48px;
            width: 88px;
        }
    }
</style>
