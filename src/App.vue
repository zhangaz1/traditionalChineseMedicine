<template>
  <div id="app">
    <commonFooter/>
    <router-view></router-view>
  </div>
</template>

<script>
    import commonFooter from '@/view/footer/commonFooter';
    export default {
        name: 'App',
        components: {
            commonFooter
        }
    };
</script>

<style lang="scss">
  .van-field__error-message {
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }
</style>
