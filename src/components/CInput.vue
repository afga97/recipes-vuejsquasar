<template>
  <div>
    <q-input borderless dense debounce="300"
      v-bind:value="value"
      @input="$emit('input', $event)"
      :placeholder="placeholder">
      <template v-slot:append v-if="icon">
        <q-icon :name="icon" />
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'CInput',
  props: ['value', 'placeholder', 'icon'],
  methods: {
    input: function (event) {
      self.$emit('input', event.target.value)
    }
  }
}
</script>
