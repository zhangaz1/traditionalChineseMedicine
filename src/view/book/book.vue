<template>
    <div class="book ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
        >
            <div slot="publicTitleRight" class="book_right" @click="onSearch">
                <van-icon name="search" />
            </div>
        </publicTitle>
        <div class="book_box plr30 mt20">
            <div class="book_box_menu" v-for="(item, index) of menuData" :key="item.data[index].id + index">
                <div class="title ptb10">{{item.title}}</div>
                <ul class="library_list ptb20">
                    <li
                            @click="switchTap(item.title, index, item.data[index].name)"
                            class="library_list_li ptb10 mb30 plr20 mr70"
                            v-for="(list, index) of item.data"
                            :key="'list' + index"
                    >{{list.name}}</li>
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
                current: 0 // 下标索引
            };
        },
        methods: {
            /** 2020/3/19
            * 作者：王青高
            * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
            * 参数：{}
            */
            getCurrent(index) {
                this.current = index;
                console.log(this.current);
            },
            /** 2020/3/19
            * 作者：王青高
            * 功能：{} 弹出搜索
            * 参数：{}
            */
            onSearch() {
                console.log('点击了搜索');
            },
            /** 2020/3/23
            * 作者：王青高
            * 功能：{} 切换搜索或分类页
            * 参数：{}
            */
            switchTap(title, index, name) {
                if (title === '热门') {
                    this.$router.push({ path: '/searchResult', query: { id: index, name: name } });
                } else {
                    this.$router.push({ path: '/bookTypeLlist', query: { id: index, name: name } });
                }
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
        &_box {
            background: $bgc-theme;
        }
        &_right {
            width: 100px;
            height: $size;
            font-size: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
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
