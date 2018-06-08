// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
{{#isEnabled plugins 'axios'}}
import axios from 'axios';
{{/isEnabled}}
import App from './App';
{{#isEnabled plugins 'vue-router'}}
import router from './router';
{{/isEnabled}}
{{#isEnabled plugins 'vuex'}}
import store from './store';
{{/isEnabled}}

Vue.config.productionTip = false;
{{#isEnabled plugins 'axios'}}
Vue.http = Vue.prototype.$http = axios
{{/isEnabled}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#isEnabled plugins 'vue-router'}}
  router,
  {{/isEnabled}}
  {{#isEnabled plugins 'vuex'}}
  store,
  {{/isEnabled}}
  components: { App },
  template: '<App/>',
});
