<template>
    <div class="backTop" v-if="isScrollTop" @click.stop="isTop">
        <van-icon name="upgrade" class="backTop_txt"/>
    </div>
</template>

<script>
    export default {
        name: 'publicBackTop',
        data() {
            return {
                isScrollTop: false, // 是否显示向上置顶
                timer: null, // 计时器
            };
        },
        methods: {
            getScrollTop() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                return scrollTop;
            },
            handleScroll() {
                let screenH = screen.height; // 获取屏幕的高度
                let windowScrollY = this.getScrollTop(); // 获取滚动距离
                // console.log('screenH', screenH, 'windowScrollY', windowScrollY, 'screenH_', screenH);
                if (windowScrollY > screenH) {
                    // 当滚动大于一屏高度时的操作
                    this.isScrollTop = true;
                } else {
                    // 当滚动小于于一屏高度时的操作
                    this.isScrollTop = false;
                }
            },
            /** 2020/3/30
            * 作者：王青高
            * 功能：{} 向上置顶
            * 参数：{}
            */
            isTop() {
                let self = this;
                document.body.scrollTop = 0;
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll, true);
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/_mixins";

    .backTop {
        position: fixed;
        right: 30px;
        bottom: 125px;
        width: 100px;
        height: 100px;
        background: rgba(3, 3, 3, .3);
        @include flex-center();
        border-radius: 50%;
        z-index: $backtop-z-index;
        &_txt {
            font-size: 72px;
            color: $color-default;
        }
    }
</style>
