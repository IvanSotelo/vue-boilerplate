<template lang="pug">
#app
  img(src='./assets/logo.png')
  h1 {{loading}}
  {{#isEnabled plugins 'vue-router'}}
  router-view(v-cloak)
  {{else}}
  HelloWorld
  {{/isEnabled}}
  loader(v-if="!loading")
</template>

<script>
import Loader from '@/loader/Loader';
{{#isEnabled plugins 'vue-router'}}
{{else}}
import HelloWorld from '@/components/HelloWorld';
{{/isEnabled}}
export default {
  name: '{{ name }}',
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
