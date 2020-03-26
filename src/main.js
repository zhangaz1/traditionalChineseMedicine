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
import '../node_modules/vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js';
import '../node_modules/video.js/dist/video-js.css';
import '../node_modules/vue-video-player/src/custom-theme.css';
import VideoPlayer from 'vue-video-player';
// import vshare from 'vshare';

import { Icon, Search, Swipe, Overlay, SwipeItem, Lazyload, sticky, Tab, Tabs, Dialog, NavBar, Form, Field, Button, Checkbox, CheckboxGroup, Toast, Uploader, RadioGroup, Radio, ActionSheet, Loading } from 'vant';
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.use(Alert);
Vue.use(VideoPlayer);
// Vue.use(vshare);
Vue.use(Icon).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(sticky).use(Tabs).use(Tab).use(Dialog).use(NavBar).use(Form).use(Field).use(Button).use(Checkbox).use(CheckboxGroup).use(Toast).use(Uploader).use(RadioGroup).use(Radio).use(ActionSheet).use(Loading).use(Overlay);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
