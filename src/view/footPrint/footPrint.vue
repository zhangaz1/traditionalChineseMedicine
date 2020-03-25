<template>
    <div class="footPrint ptb108">
        <publicTitle
                :navData="navData"
                @getCurrent="getCurrent"
        >
            <div slot="publicTitleRight" class="footPrint_right plr20" @click="_delete">清空</div>
        </publicTitle>
        <ul class="footPrint_box plr30">
            <li class="footPrint_box_li pl100">
                <img :src="require('../../assets/img/footPrint.png')" alt="" class="img">
                <div class="right ptb10">
                    <h3 class="right_title ptb10">名家医案</h3>
                    <div class="right_txt ptb10"><span class="right_txt_one">赵绍琴临证验精选</span><span class="right_txt_one">> 美尼尔氏综合征</span></div>
                </div>
            </li>
            <li class="footPrint_box_li pl100">
                <img :src="require('../../assets/img/footPrint.png')" alt="" class="img">
                <div class="right ptb10">
                    <h3 class="right_title ptb10">名家医案</h3>
                    <div class="right_txt ptb10"><span class="right_txt_one">赵绍琴临证验精选</span><span class="right_txt_one">> 美尼尔氏综合征</span></div>
                </div>
            </li>
            <li class="footPrint_box_li pl100">
                <img :src="require('../../assets/img/footPrint.png')" alt="" class="img">
                <div class="right ptb10">
                    <h3 class="right_title ptb10">名家医案</h3>
                    <div class="right_txt ptb10"><span class="right_txt_one">赵绍琴临证验精选</span><span class="right_txt_one">> 美尼尔氏综合征</span></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import publicTitle from '@/components/publicTitle';
    import { navData } from './config';
    import { getFoot, clearFoot } from '@/api/content';
    import axios from 'axios';
    import qs from 'qs';
    import { Toast } from 'vant';
    export default {
        name: 'footPrint',
        data() {
            return {
                navData, // 导航项
                current: 0, // 下标索引
                pagesize: 15,
                page: 1,
                footList: [], // 存储足迹或收藏内容
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
                getFoot({
                    pagesize: this.pagesize,
                    page: this.page,
                    type: index
                }).then(res => {
                    console.log('res', res);
                });
                axios.get('/footprint/getFoot', qs.stringify({
                    pagesize: this.pagesize,
                    page: this.page,
                    type: index
                })).then(res => {
                    console.log('res', res);
                });
            },
            /** 2020/3/19
             * 作者：王青高
             * 功能：{} 弹出搜索
             * 参数：{}
             */
            onSearch() {
                console.log('点击了搜索');
            },
            /** 2020-3-22 0022
             *作者:王青高
             *功能: 清空列表内容
             *参数:
             */
            _delete() {
                clearFoot({ type: this.current }).then(res => {
                    if (res.state === '1') {
                        this.footList = [];
                        Toast('清除成功');
                    }
                });
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
    }
</style>
