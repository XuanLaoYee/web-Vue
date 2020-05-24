import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
}).$mount('#app')
