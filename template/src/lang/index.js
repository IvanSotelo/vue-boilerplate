import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locals/en_US'
import es from './locals/es_MX'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'es',
  messages: {
    en: {
      lang: en
    },
    es: {
      lang: es
    }
  }
})
