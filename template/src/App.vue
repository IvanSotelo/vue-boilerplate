<template lang="pug">
#app
  img(src='./assets/logo.png')
  {{#isEnabled plugins 'vue-router'}}
  router-view(v-cloak)
  {{else}}
  HelloWorld
  {{/isEnabled}}
  loader(v-if="!loading")
</template>

<script>
import Loader from '@/loader/Loader';
import ImagePreloader from 'image-preloader';
{{#isEnabled plugins 'vue-router'}}
{{else}}
import HelloWorld from '@/components/HelloWorld';
{{/isEnabled}}
export default {
  name: '{{ name }}',
  data() {
    return {
      loading: false,
    };
  },
  created() {
    const preloader = new ImagePreloader();
    const n = ['../assets/img/map.svg'];
    preloader.preload(n)
      .then(() => {
        console.log('%c Vue Boilerplate By Ivan Sotelo %c 0.0.0 ', 'background: #35495e; color: #fff', 'background: #60b883; color: #fff');
        this.loading = true;
      });
  },
  components: {
    {{#isEnabled plugins 'vue-router'}}
    {{else}}
    HelloWorld,
    {{/isEnabled}}
    Loader,
  },
};
</script>
{{#if_eq cssConfig 'scss'}}
<style lang="scss">
{{else}}
<style>
{{/if_eq}}
body {
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
