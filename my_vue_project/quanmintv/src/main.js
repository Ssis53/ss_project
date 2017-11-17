// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myHeader from './components/my-header'
import store from './vuex/Store'
import mySlider from './components/my-slider'
import myIndexCon from './components/my-index-con'
import myFooter from './components/my-footer'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);

window.axios = axios
Vue.use(MintUI)

Vue.component(myHeader.name, myHeader)
Vue.component(mySlider.name, mySlider)
Vue.component(myIndexCon.name, myIndexCon)
Vue.component(myFooter.name, myFooter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
