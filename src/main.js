import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'; // element配置
import 'element-ui/lib/theme-chalk/index.css'; // element配置



import router from '@/router' // 导入路由模块

Vue.config.productionTip = false

Vue.use(ElementUI); //element配置

new Vue({
  render: h => h(App),
  router: router //2,挂载路由模块
}).$mount('#app')