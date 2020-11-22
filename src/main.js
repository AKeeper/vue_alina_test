import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Toasted from 'vue-toasted';
import App from './App.vue';
import modules from './store';

Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Toasted, { duration: 3000 });

const store = new Vuex.Store({
  modules,
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
