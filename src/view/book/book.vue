<template>
    <div class="book ptb108">
        <publicTitle
                class="publicTitle"
                :navData="navData"
                @getCurrent="getCurrent"
                @onSearch="onSearch"
        ></publicTitle>
        <div class="book_box plr30 mt20">
            <div class="book_box_menu" v-for="(item, index) of menuData" :key="item.data[index].id + index">
                <div class="title ptb10">{{item.title}}</div>
                <ul class="library_list ptb20">
                    <router-link
                            tag="li"
                            :to="{path: '/', query: {id: item.data[index].id}}"
                            class="library_list_li ptb10 mb30 plr20 mr70"
                            v-for="(list, index) of item.data"
                            :key="'list' + index"
                    >{{list.name}}</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import { navData, menuData } from './config';
    export default {
        name: 'book',
        data() {
            return {
                navData, // 导航项
                menuData, // 列表内容
                current: 0
            };
        },
        methods: {
            /* 2020/3/19
            * 作者：王青高
            * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
            * 参数：{}
            */
            getCurrent(index) {
                this.current = index;
                console.log(this.current);
            },
            /* 2020/3/19
            * 作者：王青高
            * 功能：{} 弹出搜索
            * 参数：{}
            */
            onSearch() {
                console.log('点击了搜索');
            }
        },
        components: {
            publicTitle
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .book {
        background: #f3f2eb;
        &_box {
            background: $bgc-theme;
        }
    }
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
            width: 20%;
            border: 1px solid $color;
            background: #fefff9;
            border-radius: 60px;
            text-align: center;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
</style>
