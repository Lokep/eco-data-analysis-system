import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Data from '@/pages/data'
import Administor from '@/pages/administorManagement'
import Login from '@/pages/login'
import Error from '@/pages/error'
import checkParams from '@/pages/checkParams'

Vue.use(Router)

const router = new Router({
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
        path: '/error',
        name: 'error',
        component: Error
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            notLogin: true
        }
    }, {
        path: '/checkParams',
        name: 'checkParams',
        component: checkParams,
        meta: {
            noDefaultComponent: true
        }
    }]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(r => !r.meta.notLogin)) {
        var data = localStorage.getItem('userinfo');
        if(data) {
            var dataObj = JSON.parse(data);
            if (dataObj && Date.now() - dataObj.date < 2 * 60 * 60 * 1000) {
                next();
            } else {
                alert("信息已过期")
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                })
            }
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;