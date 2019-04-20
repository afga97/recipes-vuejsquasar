<template>
  <div>
    <q-input borderless v-if="type != 'textarea'"
      :label="label" :counter="counter" :maxlength="maxlength"
      v-bind:value="value" :dense="dense" :filled="filled" :disable="disable"
      @input="$emit('input', $event)"
      :placeholder="placeholder"
      :hint="hint"
      :type="type"
      >
      <template v-slot:append>
        <q-icon :name="icon" v-if="icon"/>
        <q-icon name="cancel" @click.stop="cleanInput" class="cursor-pointer" v-if="cleaned"/>
      </template>
      <template v-slot:prepend>
        <q-icon :name="iconprepend" />
      </template>
    </q-input>
    <q-input borderless v-if="type == 'textarea'"
      :label="label" :counter="counter" :maxlength="maxlength"
      v-bind:value="value" :dense="dense" :filled="filled" :disable="disable"
      @input="$emit('input', $event)"
      :placeholder="placeholder"
      :hint="hint"
      :type="type"
      :rows="rows"
      >
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
      type: String,
      required: false
    },
    hint: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: Number,
      default: 3
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
