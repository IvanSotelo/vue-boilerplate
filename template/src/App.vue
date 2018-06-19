<template lang="pug">
#app
  {{#isEnabled plugins 'vue-router'}}
  router-view(v-cloak, v-if="!isLoading")
  {{else}}
  HelloWorld
  {{/isEnabled}}
  loader(v-if="isLoading")
</template>

<script>
import Loader from '@/loader/Loader';
{{#isEnabled plugins 'vuex'}}
{{else}}
import ImagePreloader from 'image-preloader';
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
