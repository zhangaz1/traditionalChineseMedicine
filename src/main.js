import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
// import 'lib-flexible'; // 移动端适配
import '@/assets/js/rem.js';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import Alert from './components/alert';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import '@/assets/css/index.scss';
import 'vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js';

import { Icon, Search, Swipe, SwipeItem, Lazyload, sticky, Tab, Tabs, Dialog, NavBar } from 'vant';
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.use(Alert);

Vue.use(Icon).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(sticky).use(Tabs).use(Tab).use(Dialog).use(NavBar);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
