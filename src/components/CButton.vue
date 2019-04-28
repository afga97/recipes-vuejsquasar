<template>
  <q-btn
    :type="type"
    @click="onClick"
    :size="size"
    :color="color"
    :label="label"
    :class="classBtn"
    :icon="icon"
    no-caps
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
  }
}
</script>
