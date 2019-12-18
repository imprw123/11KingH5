// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Swipe, SwipeItem } from 'vue-swipe';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
import request from './api/api.js';
import ports from './api/port.js'
import { TabContainer, TabContainerItem } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.prototype.$axios = request;
Vue.prototype.$ports = ports;
Vue.use(Lazyload);
//注册轮播图
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
Vue.config.productionTip = false
Vue.use(MintUI)

import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

router.beforeEach((to, from, next) => {

        if (to.meta.cheakIsLogin) {
            if (window.localStorage.getItem('loginInfo')) {
                next();
            } else {
                Toast('请您先去登录!');
                return;
            }
        } else {
            next();
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})