export default {
  props: {
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
    outline: {
      type: Boolean
    },
    submitting: {
      type: Boolean,
      default: true
    },
    tooltipText: {
      type: String
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
