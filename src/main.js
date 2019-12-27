// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //引入store
import { Swipe, SwipeItem } from 'vue-swipe';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
import request from './api/api.js';
import ports from './api/port.js'
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Popup } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
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
});


Vue.prototype.$isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    console.log(ua); //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};


Vue.filter('myDateFilter', function(timestamp) {
    var date = new Date(
        parseInt(timestamp.replace("/Date(", "").replace(")/", ""), 10)
    );
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "";
    var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M

})



new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})