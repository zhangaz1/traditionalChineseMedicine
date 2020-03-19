import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/home/home.vue')
        },
        {
            path: '/book',
            name: 'book',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/book/book.vue')
        },
        {
            path: '/doctorCase',
            name: 'doctorCase',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/doctorCase/doctorCase.vue')
        },
        {
            path: '/videoBox',
            name: 'videoBox',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/videoBox/videoBox.vue')
        },
        {
            path: '/me',
            name: 'me',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/me/me.vue')
        },
        {
            path: '/doctorCase/components/doctorDetail',
            name: 'doctorDetail',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/doctorCase/components/doctorDetail.vue')
        }
    ]
});
