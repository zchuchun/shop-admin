
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共样式
import '@/assets/css/base.css'
import axios from 'axios'

// 使用element-ul插件
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
