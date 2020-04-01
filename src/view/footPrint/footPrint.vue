<template>
    <div class="footPrint ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
                @goback="goback"
                :_active="true"
                :_left="true"
        >
            <div slot="publicTitleRight" class="footPrint_right plr20" @click="_delete">清空</div>
        </publicTitle>
        <ul class="footPrint_box plr30" v-if="footList.length" @scroll="handleScroll($event)">
            <li class="footPrint_box_li pl100" v-for="(item, index) of footList" :key="'item' + index" @click="toRouter(item)">
                <img :src="require('../../assets/img/footPrint.png')" alt="" class="img">
                <div class="right ptb10">
                    <h3 class="right_title ptb10">{{item.title}}</h3>
                    <div class="right_txt ptb10" v-if="item.createtime"><span class="right_txt_one">{{item.createtime}}</span></div>
                    <div class="right_txt ptb10" v-else-if="item.updatetime"><span class="right_txt_one">{{item.updatetime}}</span></div>
                </div>
            </li>
            <li class="li noData ptb30 plr30" v-if="footList.length === totalcount">没有更多数据</li>
        </ul>
        <div v-else-if="type === 1 && !footList.length" class="footPrint_tips ptb40">暂无浏览</div>
        <div v-else-if="type === 2 && !footList.length" class="footPrint_tips ptb40">暂无收藏</div>
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import loadMore from '@/components/loadMore/loadMore.vue';
    import { navData } from './config';
    import { getFoot, clearFoot } from '@/api/content';
    import { Toast } from 'vant';
    import { EventBus } from "@/utils/event-bus";
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
                totalcount: '0' // 存储总数
            };
        },
        created() {
            localStorage.setItem('isDisplay', 'false');
        },
        mounted() {
            this.getCurrent(0);
            EventBus.$emit("isDisplay", { data: false });
        },
        methods: {
            /** 2020/3/26
             * 作者：王青高
             * 功能：{} 监听滚动条
             * 参数：{}
             */
            handleScroll(event) {
                let scrollTop = event.target.scrollTop;
                let clientHeight = event.target.clientHeight;
                let scrollHeight = event.target.scrollHeight;
                if (scrollTop + clientHeight >= (scrollHeight - 10)) {
                    this.page++;
                    this.getCurrent(this.current, 'isPull');
                }
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{Function} @getCurrent 获取当前下标索引，显示相关内容
             * 参数：{}
             */
            getCurrent(index, isStr) {
                this.type = (index + 1);
                this.current = index;
                getFoot({
                    pagesize: this.pagesize,
                    page: this.page,
                    type: this.type
                }).then(res => {
                    let result = res.data;
                    if (res.state === '1') {
                        this.totalcount = result.totalcount;
                        if (isStr) {
                            this.footList = this.footList.concat(result.list);
                        } else {
                            this.footList = result.list;
                        }
                    }
                }).catch(err => {
                    if (err) this.footList = [];
                    this.$router.push('/login');
                });
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: 清空列表内容
             *参数:
             */
            _delete() {
                if (!this.footList.length) {
                    if (this.type === 1) Toast('目前没有足迹');
                    if (this.type === 2) Toast('目前没有收藏');
                    return;
                }
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
                if (obj) {
                    switch (obj.type) {
                        case 1:
                            this.$router.push({ path: '/bookContentFeed', query: { id: obj.tempid } });
                            break;
                        case 2:
                            this.$router.push({ path: '/doctorCase/components/doctorDetail', query: { id: obj.tempid } });
                            break;
                        case 3:
                            this.$router.push({ path: '/videoBox/components/videoBoxDetail', query: { id: obj.tempid } });
                            break;
                    }
                }
            },
            /** 2020/4/1
            * 作者：王青高
            * 功能：{} 返回上一页
            * 参数：{}
            */
            goback() {
                this.$router.go(-1);
            }
        },
        components: {
            publicTitle
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .footPrint {
        height: 85vh;
        background: $bgc-theme;
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
            .noData {
                text-align: center;
                color: $ccc-color;
                font-size: 28px;
            }
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
                    top: 20px;
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
            color: $ccc-color;
        }
    }
</style>
