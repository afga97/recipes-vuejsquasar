import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

// const dictionary = {
//   en: {
//     messages: {
//       required: (val) => `this ${val} is required`
//     }
//   },
//   es: {
//     messages: {
//       required: () => 'Este campo es requerido'
//     }
//   },
//   ar: {
//     messages: {
//       required: () => 'sdasdASDASD'
//     }
//   }
// }
Validator.localize('es', es)
const config = {
  locale: 'es'
}

export default async ({ app, Vue }) => {
  Vue.use(VeeValidate, config)
}
