<template>
    <div class="doctorCase ptb108">
        <publicTitle
                class="publicTitle"
                :navData="navData"
                @getCurrent="getCurrent"
                @onSearch="onSearch"
        ></publicTitle>
        <!--  热门  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu" v-for="(item, index) of menuData" :key="item.data[index].id + index">
                <div class="title ptb10">{{item.title}}</div>
                <pupblicPanel :listData="item.data" @switchTab="switchTab"/>
            </div>
        </div>
        <!--  热门  end -->
        <!--  科室  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu" v-for="(item, index) of menuData" :key="item.data[index].id + index">
                <div class="title ptb10">{{item.title}}</div>
                <pupblicPanel :listData="item.data" @switchTab="switchTab"/>
            </div>
        </div>
        <!--  科室  end -->
        <!--  科室分类  start -->
        <div class="doctorCase_box plr30 mt20">
            <div class="doctorCase_box_menu" v-for="(item, index) of menuData" :key="item.data[index].id + index">
                <div class="title ptb10">{{item.title}}</div>
                <pupblicPanel :listData="item.data" @switchTab="switchTab"/>
            </div>
        </div>
        <!--  科室分类 end -->
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import pupblicPanel from '@/components/publicPanel';
    import { navData, menuData } from './config';
    export default {
        name: 'doctorCase',
        data() {
            return {
                navData, // 导航项
                menuData, // 列表内容
                current: 0,
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
            /** 2020-3-19 0019
             *作者:王青高
             *功能: {} 获取当前点击的
             *参数:
             */
            switchTab(data) {
                console.log('data', data);
                this.$router.push({path: '/doctorCase/components/doctorDetail', query: { id: 1}});
            }
        },
        components: {
            publicTitle,
            pupblicPanel
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .doctorCase {
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
