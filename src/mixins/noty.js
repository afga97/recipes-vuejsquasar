import { Notify } from 'quasar'
export default {
  messageOptions (config, fnAccept) {
    const { type, message, timeout, position, icon, actions } = config
    const buttonColor = type ? 'white' : void 0
    const twoActions = actions

    const configNoty = {
      message: message,
      color: type,
      timeout: timeout != null ? timeout * 1000 : 0,
      position: position,
      icon: icon != null ? icon : 'check',
      actions: twoActions
        ? [
          { label: 'Aceptar', color: 'yellow', handler: () => fnAccept() },
          { label: 'Cancelar', color: buttonColor, handler: () => console.log('wooow') }
        ]
        : null
    }
    return configNoty
  },
  message (config) {
    const { type, message, timeout, position, icon } = config
    Notify.create({
      message: message,
      color: type,
      timeout: timeout != null ? timeout * 1000 : 5 * 1000,
      position: position,
      icon: icon != null ? icon : 'check'
    })
  }
}
