<template lang="pug">
  .loader
    fingerprint-spinner(:animation-duration="1500" :size="64" color="#ff1d5e")
</template>

<script>
import { FingerprintSpinner } from 'epic-spinners';

export default {
  name: 'Loader',
  components: {
    FingerprintSpinner,
  },
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
