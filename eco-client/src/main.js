// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;

/* 引入默认样式 */
import '../src/assets/styles/reset.css'
import '../src/assets/styles/common.css'
/* 引入font-icon */
import '../src/assets/styles/font-awesome.min.css'

/* 引入ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* 引入echarts */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})