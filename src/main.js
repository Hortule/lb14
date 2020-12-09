import Vue from 'vue'
import App from './App.vue'
import VueRosource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueRosource);

new Vue({
  render: h => h(App),
}).$mount('#app');
