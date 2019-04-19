<template>
  <div>
    <q-input borderless :label="label" :counter="counter" :maxlength="maxlength"
      v-bind:value="value" :dense="dense" :filled="filled" :disable="disable"
      @input="$emit('input', $event)"
      :placeholder="placeholder">
      <template v-slot:append v-if="icon">
        <q-icon :name="icon" />
      </template>
      <template v-if="cleaned" v-slot:append>
        <q-icon name="cancel" @click.stop="cleanInput" class="cursor-pointer" />
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
      default: true
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
    }
  },
  // props: ['value', 'placeholder', 'icon', 'label', 'counter'],
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
