import { Notify } from 'quasar'

export default {
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
