<template lang="pug">
#app
  img(src='./assets/logo.png')
  {{#isEnabled plugins 'vue-router'}}
  router-view(v-cloak)
  {{else}}
  HelloWorld
  {{/isEnabled}}
  loader(v-if="isLoading")
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
      {{#isEnabled plugins 'vuex'}}
      {{else}}
      isLoading: true,
      {{/isEnabled}}
      images:[
        '../assets/img/map.svg',
      ],
    };
  },
  created() {
    const preloader = new ImagePreloader();
    preloader.preload(this.images)
      .then(() => {
        {{#isEnabled plugins 'vuex'}}
        this.$store.dispatch('PRELOAD_STATE');
        {{else}}
        this.isLoading = false;
        {{/isEnabled}}
      });
  },
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
