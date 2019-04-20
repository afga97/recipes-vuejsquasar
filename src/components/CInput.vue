<template>
  <div>
    <q-input borderless :label="label" :counter="counter" :maxlength="maxlength"
      v-bind:value="value" :dense="dense" :filled="filled" :disable="disable"
      @input="$emit('input', $event)"
      :placeholder="placeholder">
      <template v-slot:append>
        <q-icon :name="icon" v-if="icon"/>
        <q-icon name="cancel" @click.stop="cleanInput" class="cursor-pointer" v-if="cleaned"/>
      </template>
      <template v-slot:prepend>
        <q-icon :name="iconprepend" />
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'CInput',
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    counter: {
      type: Boolean,
      default: false,
      required: false
    },
    dense: {
      type: Boolean,
      default: false,
      required: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      required: false
    },
    maxlength: {
      type: Number,
      required: false
    },
    cleaned: {
      type: Boolean,
      default: false
    },
    iconprepend: {
      type: String
    }
  },
  methods: {
    input: function (event) {
      this.$emit('input', event.target.value)
    },
    cleanInput: function () {
      this.$emit('cleaned', event.target.value)
    }
  }
}
</script>
