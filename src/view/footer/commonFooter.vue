<template>
    <div class="footer">
        <ul class="footer_txt">
            <router-link tag="li" @click="switchTap(index)" :class="{active: current === index}" :to="item.name" v-for="(item, index) of footerData" :key="'item.txt' + index" class="footer_txt_li" >
                <van-icon :name="item.icon" class="icon" />
                <span>{{item.txt}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'commonFooter',
        data() {
            return {
                footerData: [
                    {
                        'txt': '主页',
                        'icon': 'wap-home-o',
                        'name': '/'
                    },
                    {
                        'txt': '书库',
                        'icon': 'newspaper-o',
                        'name': 'book'
                    },
                    {
                        'txt': '医案',
                        'icon': 'wap-home-o',
                        'name': 'doctorCase'
                    },
                    {
                        'txt': '视频',
                        'icon': 'wap-home-o',
                        'name': 'videoBox'
                    },
                    {
                        'txt': '我的',
                        'icon': 'wap-home-o',
                        'name': 'me'
                    }
                ],
                current: 0
            };
        },
        methods: {
            /* 2020/3/19
            * 作者：王青高
            * 功能：{} 切换路由改变焦点颜色
            * 参数：{String} index: 下标索引
            */
            switchTap(index) {
                console.log(index);
                this.current = index;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";
    .footer {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100px;
        box-shadow: 0 -3px 10px rgba(3, 3, 3, 0.1);
        bottom: 0;
        z-index: $navbar-z-index;
        background: $color-default;
        &_txt {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100%;
            &_li {
                width: 25%;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                .icon {
                    font-size: 48px;
                }
            }
        }
    }
    .active {
        background: $bgColor;
        color: $color;
    }
</style>
