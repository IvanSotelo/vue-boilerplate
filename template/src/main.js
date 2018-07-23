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
{{#isEnabled plugins 'vue-i18n'}}
import i18n from './lang';
{{/isEnabled}}
Vue.config.productionTip = false;
{{#isEnabled plugins 'axios'}}
Vue.http = Vue.prototype.$http = axios;
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
  {{#isEnabled plugins 'vue-i18n'}}
  i18n,
  {{/isEnabled}}
  components: { App },
  template: '<App/>',
});

console.log('%c Vue Boilerplate By Ivan Sotelo %c 0.0.0 ', 'background: #35495e; color: #fff', 'background: #60b883; color: #fff');
