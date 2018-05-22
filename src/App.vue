<template lang="pug">
#app
  img(src='./assets/logo.png')
  h1 {{loading}}
  router-view(v-cloak)
  loader(v-if="!loading")
</template>

<script>
import Loader from '@/loader/Loader';

export default {
  name: 'App',
  components: {
    Loader,
  },
};
</script>

<style lang="scss">
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
