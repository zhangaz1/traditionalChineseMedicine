<template>
    <div class="copyright">
        <p class="copyright_top">Copyright©2012-2020书库与医案保障所有权</p>
        <p class="copyright_bottom">版权号: 00000000000</p>
    </div>
</template>

<script>
    export default {
        name: 'copyright'
    };
</script>

<style lang="scss" scoped>
    .copyright {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100px;
        background: #ded7ca;
        &_bottom,
        &_top {
            font-size: 24px;
            color: #909394;
        }
    }
</style>
