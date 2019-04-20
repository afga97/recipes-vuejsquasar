<template>
  <q-btn
    :type="type"
    @click="onClick"
    :outline="outline"
    :size="size"
    :color="color"
    :label="label"
    >
    <template v-if="submitting">
      <q-spinner-facebook />
    </template>
  </q-btn>
</template>
<script>
import BtnMixin from '../mixins/btn-mixin'
export default {
  name: 'CButton',
  mixins: [BtnMixin],
  props: {
    submitting: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },
  methods: {
    onClick: function () {
      this.$emit('guardar')
    }
  }

}
</script>
