<template lang="pug">
  {{#isEnabled plugins 'vue-router'}}
#app(v-bind:class="[isLoading ? 'is-loading' : 'is-loaded' , routeName]")
  router-view(v-cloak, v-if="!isLoading")
  {{else}}
#app(v-bind:class="[isLoading ? 'is-loading' : 'is-loaded']")
  HelloWorld
  {{/isEnabled}}
  loader(v-if="isLoading")
</template>

<script>
import Loader from '@/loader/Loader';
{{#isEnabled plugins 'vuex'}}
{{else}}
import ImagePreloader from 'image-preloader';
import { detect } from 'detect-browser';
{{/isEnabled}}
{{#isEnabled plugins 'vue-router'}}
{{else}}
import HelloWorld from '@/components/HelloWorld';
{{/isEnabled}}
export default {
  name: '{{ name }}',
  {{#isEnabled plugins 'vuex'}}
  {{else}}
  data() {
    return {
      isLoading: true,
      images:[
        './assets/logo.png',
        // Your images for preload
      ],
    };
  },
  created() {
    const preloader = new ImagePreloader();
    preloader.preload(this.images)
      .then(() => {
        this.isLoading = false;
      });
  },
  {{/isEnabled}}
  components: {
    {{#isEnabled plugins 'vue-router'}}
    {{else}}
    HelloWorld,
    {{/isEnabled}}
    Loader,
  },
  {{#isEnabled plugins 'vuex'}}
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    {{#isEnabled plugins 'vue-router'}}
    routeName () {
      return this.$store.getters.routeName;
    },
    {{/isEnabled}}
  },
  beforeCreate: function () {
    let isMobile = window.innerWidth <= 768;
    this.$store.dispatch('DEVICE_SIZE', isMobile);
  },
  {{else}}
  beforeCreate: function () {
    const browser = detect();
    console.log(browser.name);
  },
  {{/isEnabled}}
};
</script>
{{#if_eq cssConfig 'scss'}}
<style lang="scss">
{{else}}
<style>
{{/if_eq}}
body {
  background-color: $background-color;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
[v-cloak] {
  display: none;
}
</style>
