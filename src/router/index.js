import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import RPG from '@/components/RPG'
import DOTA from '@/components/Dota'
import MY from '@/components/my'
import YAO from '@/components/yao'
import GIFTS from '@/components/gifts'
import ACTIVE from '@/components/active'
import FULI from '@/components/fuli'
import GIFTDETAIL from '@/components/giftdetail'
import MYYAODOU from '@/components/myYaoDou'
import MYKK from '@/components/mykk'
import BINDPHONE from '@/components/bindPhone'
import MJ from '@/components/mj'
import SALE from '@/components/sale'
import TD from '@/components/td'
import YHQ from '@/components/yhq'
import YHQCENTER from '@/components/yhqCenter'
import LOGIN from '@/components/login'
import GIFTRECORDLIST from '@/components/giftRecordList'
import NEWSDETAIL from '@/components/newsDetail'
import LOADAPP from '@/components/loadApp'
import MODECONTAINER from '@/components/modeContainer'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/rpg',
            name: 'rpg',
            component: RPG
        },
        {
            path: '/dota',
            name: 'dota',
            component: DOTA
        },
        {
            path: '/my',
            name: 'my',
            component: MY,
            meta: {
                cheakIsLogin: false
            }
        },
        {
            path: '/yao',
            name: 'yao',
            component: YAO
        },
        {
            path: '/gitfs',
            name: 'gitfs',
            component: GIFTS
        },
        {
            path: '/active',
            name: 'active',
            component: ACTIVE
        },
        {
            path: '/fuli',
            name: 'fuli',
            component: FULI
        },
        {
            path: '/giftdetail',
            name: 'giftdetail',
            component: GIFTDETAIL
        },
        {
            path: '/myYaoDou',
            name: 'myYaoDou',
            component: MYYAODOU,
            meta: {
                cheakIsLogin: true
            }
        },
        {
            path: '/mykk',
            name: 'mykk',
            component: MYKK,
            meta: {
                cheakIsLogin: true
            }
        },
        {
            path: '/bindPhone',
            name: 'bindPhone',
            component: BINDPHONE
        },
        {
            path: '/mj',
            name: 'mj',
            component: MJ
        },
        {
            path: '/sale',
            name: 'sale',
            component: SALE
        },
        {
            path: '/td',
            name: 'td',
            component: TD
        },
        {
            path: '/yhq',
            name: 'yhq',
            component: YHQ,
            meta: {
                cheakIsLogin: true
            }
        },
        {
            path: '/yhqCenter',
            name: 'yhqCenter',
            component: YHQCENTER,
            meta: {
                cheakIsLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LOGIN
        },
        {
            path: '/giftRecordList',
            name: 'giftRecordList',
            component: GIFTRECORDLIST,
            meta: {
                cheakIsLogin: true
            }
        },
        {
            path: '/newsDetail',
            name: 'newsDetail',
            component: NEWSDETAIL
        },
        {
            path: '/loadApp',
            name: 'loadApp',
            component: LOADAPP
        },
        {
            path: '/modeContainer',
            name: 'modeContainer',
            component: MODECONTAINER
        }
    ]
})