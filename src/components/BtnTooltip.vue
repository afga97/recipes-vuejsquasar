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
    <q-tooltip
      :content-class="contentclass"
      :offset="offset"
      :self="self"
      :transition-show="tshow"
      :transition-hide="thide"
      :anchor="anchor">{{tooltipText}}</q-tooltip>
  </q-btn>
</template>
<script>
import ButtonMixin from '../mixins/btn-mixin'
export default {
  name: 'BtnTooltip',
  mixins: [ButtonMixin],
  props: {
    contentclass: {
      type: String
    },
    offset: {
      type: Array
    },
    self: {
      type: String
    },
    tshow: {
      type: String
    },
    thide: {
      type: String
    },
    anchor: {
      type: String
    },
    tooltipText: {
      type: String
    }
  }
}
</script>
