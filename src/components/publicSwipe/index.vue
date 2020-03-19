<template>
    <van-swipe :loop="_loop" :width="_width" :autoplay="_autoplay" class="swiper" :style="{height:heightVal}">
        <slot name="swiperItem"></slot>
    </van-swipe>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {

            };
        },
        props: {
            heightVal: {
                type: String,
                default: '200'
            },
            _loop: {
                type: Boolean,
                default: true
            },
            _width: {
                type: String,
                default: 'auto'
            },
            _autoplay: {
                type: String,
                default: '3000'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .swiper {}
</style>
