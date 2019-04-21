export default {
  props: {
    type: {
      type: String,
      required: false
    },
    classBtn: {
      type: String,
      required: false
    },
    size: {
      type: String
    },
    label: {
      type: String
    },
    round: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'white'
    },
    submitting: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      required: false
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
