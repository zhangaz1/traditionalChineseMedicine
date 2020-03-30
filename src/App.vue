<template>
  <div id="app">
    <div class="loadingBg" v-if="loadingShow">
      <div class="container">
        <div class="loading"></div>
        <div class="loadingTxt">正在加载中...</div>
      </div>
    </div>
    <publicBackTop/>
    <commonFooter v-if="isDisplay"/>
    <router-view></router-view>
  </div>
</template>

<script>
  import commonFooter from '@/view/footer/commonFooter';
  import publicBackTop from '@/components/publicBackTop/publicBackTop.vue';
  import { EventBus } from "@/utils/event-bus";
  export default {
    name: 'App',
    data() {
      return {
        // 请求loading框是否显示
        loadingShow: false,
        // 如果同时发出多个请求只有loadNub = 0时加载框消失
        loadNub: 0,
        isDisplay: true, // 是否显示底部导航菜单
        isScroll: false, // 禁止滚动条滚动
      }
    },
    components: {
      commonFooter,
      publicBackTop
    },
    mounted() {
      /**
       * @method 全局加载框总线监听
       * @return { res 返回 true/false}
       */
      EventBus.$on("loadingShow", res => {
        if (res.data) {
          this.loadNub++;
          this.loadingShow = res.data;
        } else {
          this.loadNub--;
          if (this.loadNub == 0) {
            this.loadingShow = res.data;
          }
        }
      });
      EventBus.$on("isDisplay", res => {
          this.isDisplay = res.data;
      });
    },
    // 离开时销毁事件总线
    beforeDestroy() {
      EventBus.$off("loadingShow");
      EventBus.$off("isDisplay");
      EventBus.$off("isOverflow");
    }
  };
</script>

<style lang="scss">

  .van-field__error-message {
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
  }
  .loadingBg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1000;
  }
  .container {
    position: absolute;
    left: calc(50% - 25px);
    top: 40%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .loading {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 5px #ffffff solid;
    border-right-color: #87ceeb;
    animation: loading 1s linear infinite;
  }
  .loadingTxt {
    text-align: center;
    color: #fff;
    margin-top: 20px;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .maskAlert {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    z-index: 109;
  }
</style>
