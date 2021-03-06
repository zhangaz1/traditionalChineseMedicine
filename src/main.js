import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import '@/assets/js/rem.js';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import '@/assets/css/index.scss';
import '../node_modules/video.js/dist/video-js.css';
import '../node_modules/vue-video-player/src/custom-theme.css';
import videoPlayer from 'vue-video-player';
import { Icon, Search, Cell, Swipe, Overlay, SwipeItem, Lazyload, List, sticky, Tab, Tabs, Dialog, NavBar, Form, Field, Button, Checkbox, CheckboxGroup, Toast, Uploader, RadioGroup, Radio, ActionSheet, Loading, Switch, Tag } from 'vant';

Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.use(videoPlayer);
Vue.use(Icon).use(Search).use(Cell).use(Swipe).use(SwipeItem).use(Lazyload).use(sticky).use(Tabs).use(Tab).use(Dialog).use(NavBar).use(Form).use(Field).use(Button).use(Checkbox).use(CheckboxGroup).use(Toast).use(Uploader).use(RadioGroup).use(Radio).use(ActionSheet).use(Loading).use(Overlay).use(Switch).use(List).use(Tag);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
