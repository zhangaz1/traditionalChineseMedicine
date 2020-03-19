<template>
    <div class="headSerach">
        <van-search
                v-model="searchVal"
                shape="round"
                class="headSerach_search"
                background="#fff"
                placeholder="输入书名、全文、作者等"
                maxlength="20 "
                @input="getSearchVal"
        />
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                searchVal: '',
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
            onEmail() {
                this.$emit('onEmail');
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
