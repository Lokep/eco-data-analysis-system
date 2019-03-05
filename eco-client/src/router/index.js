import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Data from '@/pages/data'
import Administor from '@/pages/administorManagement'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        alias: '/index'
    }, {
        path: '/data',
        name: 'data',
        component: Data
    }, {
        path: '/administor',
        name: 'administor',
        component: Administor
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            noDefaultComponent: true
        }
    }]
})