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

<style>

</style>
