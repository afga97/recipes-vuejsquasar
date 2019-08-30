import VueI18n from 'vue-i18n'
import messages from '../mixins/i18n/index'

export default async ({ app, Vue }) => {
  Vue.use(VueI18n)

  app.i18n = new VueI18n({
    locale: app.store.state.chef.language,
    fallbackLocale: 'en',
    messages
  })
}
