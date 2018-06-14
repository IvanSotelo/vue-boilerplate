<template lang="pug">
  .loader
    fingerprint-spinner(:animation-duration="1500" :size="64" color="#ff1d5e")
</template>

<script>
import { FingerprintSpinner } from 'epic-spinners';
{{#isEnabled plugins 'vuex'}}
import ImagePreloader from 'image-preloader';
{{/isEnabled}}

export default {
  name: 'Loader',
  components: {
    FingerprintSpinner,
  },
  {{#isEnabled plugins 'vuex'}}
  data() {
    return {
      images:[
        '../assets/img/map.svg',
      ],
    };
  },
  created() {
    const preloader = new ImagePreloader();
    preloader.preload(this.images)
      .then(() => {
        this.$store.dispatch('PRELOAD_STATE');
      });
  },
  {{/isEnabled}}
};
</script>

{{#if_eq cssConfig 'scss'}}
<style lang="scss">
.loader{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-image: $background-color;
  z-index: 999;
  .fingerprint-spinner{
    position: initial !important;
  }
}
</style>
{{else}}
<style>
.loader{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-image: linear-gradient(117deg,#3c2747,#222634 98%,#252433);
  z-index: 999;
}
.loader > .fingerprint-spinner{
  position: initial !important;
}
</style>
{{/if_eq}}
