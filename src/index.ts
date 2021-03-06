import './scss/main.scss';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import messages from './lang';
import locale from './locale';
import app from './app.vue';
import index from './components/index.vue';
import credits from './components/credits.vue';
import level from './components/level.vue';
import world from './components/world.vue';
import User from './model/User';

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
    { path: '/', component: index},
    { path: '/credits', component: credits},
    { path: '/world', component: world},
    { path: '/level/:levelID', component: level, props: true },
];

export const router = new VueRouter({
    routes,
    mode: 'history',
});

// Redirect to '/' when user is not logged in
router.beforeEach((to, from, next) => {
    if (User.getInstance().isLoggedIn() || to.path === '/' || to.path === '/credits') {
        next();
    } else {
        next('/');
    }
});

const i18n = new VueI18n({
    locale: 'de',
    fallbackLocale: 'de',
    messages,
});

locale.setVueI18n(i18n);

const vm: Vue = new Vue({
    el: '#app',
    template: '<app/>',
    components: { app },
    router,
    i18n,
});
