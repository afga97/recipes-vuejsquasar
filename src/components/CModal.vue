<template>
    <q-dialog v-model="open" v-if="size == 'small'" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close"/>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="open" v-else-if="size == 'medium'" persistent>
      <q-card style="width: 1000px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close"/>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="open" v-else-if="size == 'fullWidth'" full-width persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close" v-close-popup="closePop"/>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="open" v-else-if="size == 'fullHeight'" full-height persistent>
      <q-card class="column full-height">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close" v-close-popup="closePop"/>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="open" v-else-if="size == 'full'" full-height full-width persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close"/>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script>
export default {
  name: 'CModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }

}
</script>
