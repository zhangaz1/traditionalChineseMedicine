<template>
    <div class="footPrint ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
                :_active="true"
        >
            <div slot="publicTitleRight" class="footPrint_right plr20" @click="_delete">清空</div>
        </publicTitle>
        <ul class="footPrint_box plr30" v-if="footList.length">
            <li class="footPrint_box_li pl100" v-for="(item, index) of footList" :key="'item' + index" @click="toRouter(item)">
                <img :src="require('../../assets/img/footPrint.png')" alt="" class="img">
                <div class="right ptb10">
                    <h3 class="right_title ptb10">{{item.title}}</h3>
                    <div class="right_txt ptb10"><span class="right_txt_one">{{item.createtime}}</span></div>
                </div>
            </li>
        </ul>
        <div v-else-if="type === 1" class="footPrint_tips ptb40">暂无浏览</div>
        <div v-else-if="type === 2" class="footPrint_tips ptb40">暂无收藏</div>
        <load-more :loadingType="loadingType" :contentText="contentText"/>
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import loadMore from '@/components/loadMore/loadMore.vue';
    import { navData } from './config';
    import { getFoot, clearFoot } from '@/api/content';
    import { Toast } from 'vant';
    import { eventScroll } from '@/utils/addEventScroll';
    export default {
        name: 'footPrint',
        data() {
            return {
                navData, // 导航项
                current: 0, // 下标索引
                pagesize: 15,
                page: 1,
                type: 1, // 1：足迹， 2：收藏
                footList: [], // 存储足迹或收藏内容
                totalcount: '', // 存储总数
                loadingType: 0,
                contentText: {
                    contentdown: '上拉显示更多',
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了'
                }
            };
        },
        created() {
            localStorage.setItem('isDisplay', 'false');
            eventScroll().then(res => {
                if (res) {
                    this.page = (this.page + 1);
                    this.getCurrent(this.current);
                }
            });
        },
        mounted() {
            this.getCurrent(0);
        },
        methods: {
            /** 2020/3/19
             * 作者：王青高
             * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
             * 参数：{}
             */
            getCurrent(index) {
                if (this.footList.length >= this.totalcount) {
                    this.loadingType = 2;
                    return;
                }
                this.current = index;
                this.type = (index + 1);
                this.loadingType = 1;
                getFoot({
                    pagesize: this.pagesize,
                    page: this.page,
                    type: this.type
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.totalcount = result.totalcount;
                        this.footList = this.footList.concat(result.list);
                        this.loadingType = 0;
                    }
                });
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: 清空列表内容
             *参数:
             */
            _delete() {
                clearFoot({ type: this.type }).then(res => {
                    if (res.state === '1') {
                        this.footList = [];
                        Toast('清除成功');
                    }
                });
            },
            /** 2020/3/26
            * 作者：王青高
            * 功能：{} 根据分类跳转不同的详情页
            * 参数：{}
            */
            toRouter(obj) {
                console.log('obj', obj);
            }
        },
        components: {
            publicTitle,
            loadMore
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .footPrint {
        &_right {
            font-size: 24px;
            color: $coloe_3;
            white-space: nowrap;
            font-weight: bold;
        }
        &_box {
            background: $bgc-theme;
            height: 100vh;
            box-sizing: border-box;
            &_li {
                position: relative;
                &:after {
                    content: '';
                    position: absolute;
                    top: calc(50% - 7px);
                    right: 20px;
                    width: 14px;
                    height: 14px;
                    border-top: 4px solid $ccc-color;
                    border-right: 4px solid $ccc-color;
                    transform: rotate(45deg);
                }
                .img {
                    position: absolute;
                    left: 0;
                    top: 30px;
                    width: 80px;
                    height: 80px;
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid $ccc-color;
                    &_title {
                        font-size: 36px;
                        color: $color_666;
                    }
                    &_txt {
                        color: $ccc-color;
                        font-size: 24px;
                    }
                }
            }
        }
        &_tips {
            background: $bgc-theme;
            height: 80vh;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            color: $color_999;
        }
    }
</style>
