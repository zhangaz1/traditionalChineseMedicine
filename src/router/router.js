import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
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
        },
        {
            path: '/videoBox/components/videoBoxDetail',
            name: 'videoBoxDetail',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/videoBox/components/videoBoxDetail.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/login/login.vue')
        },
        {
            path: '/registered',
            name: 'registered',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/registered/registered.vue')
        },
        {
            path: '/buyVip',
            name: 'buyVip',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/buyVip/buyVip.vue')
        },
        {
            path: '/footPrint',
            name: 'footPrint',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/footPrint/footPrint.vue')
        },
        {
            path: '/learnPlan',
            name: 'learnPlan',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/learnPlan/learnPlan.vue')
        },
        {
            path: '/feedBack',
            name: 'feedBack',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/feedBack/feedBack.vue')
        },
        {
            path: '/contactUs',
            name: 'contactUs',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/contactUs/contactUs.vue')
        },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/searchResult/searchResult.vue')
        },
        {
            path: '/bookContentFeed',
            name: 'bookContentFeed',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/bookContentFeed/bookContentFeed.vue')
        },
        {
            path: '/bookDetail',
            name: 'bookDetail',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/bookDetail/bookDetail.vue')
        },
        {
            path: '/myBookBox',
            name: 'myBookBox',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/myBookBox/myBookBox.vue')
        },
        {
            path: '/bookTypeList',
            name: 'bookTypeList',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/bookTypeList/bookTypeList.vue')
        },
        {
            path: '/videoBox/components/videoBoxTxt',
            name: 'videoBoxTxt',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/videoBox/components/videoBoxTxt.vue')
        },
        {
            path: '/doctorTypeList',
            name: 'doctorTypeList',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/doctorTypeList/doctorTypeList.vue')
        },
        {
            path: '/forget',
            name: 'forget',
            component: () => import(/* webpackChunkName: 'login' */ '@/view/forget/forget.vue')
        }
    ],
    scrollBehavior: () => ({ y: 0 })
});
