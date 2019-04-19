<template>
  <q-page padding>
    <q-table
      title="Chefs"
      :data="chefs"
      :columns="columns"
      row-key="id"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="surname" :props="props">{{ props.row.surname }}</q-td>
          <q-td key="edad" :props="props">{{ props.row.edad }}</q-td>
          <q-td key="actions" :props="props">
            <div class="q-pa-xs q-gutter-sm">
            <q-btn
              color="primary"
              class="q-px-xs q-py-xs q-mt-ms"
              icon="create"
            >
            <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
            self="center right"
            transition-show="flip-right"
            transition-hide="flip-left"
            anchor="center left">Editar</q-tooltip>
            </q-btn>
            <q-btn
              color="red"
              class="q-px-xs q-py-xs q-mt-ms"
              icon="close"
            >
            <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
            self="center right"
            transition-show="flip-right"
            transition-hide="flip-left"
            anchor="center left">Eliminar</q-tooltip>
            </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  data: () => ({
    selected: [],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    columns: [
      { name: 'id', align: 'left', label: 'Código', field: 'id', sortable: false },
      { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: true },
      { name: 'surname', align: 'left', label: 'Apellido', field: 'surname', sortable: true },
      { name: 'edad', align: 'left', label: 'Edad', field: 'edad', sortable: true },
      { name: 'actions', align: 'left', label: 'Actions', field: 'acctions', sortable: false, style: 'width: 40px' }
    ]
  }),
  computed: {
    ...mapGetters({
      chefs: 'chefs' })
  },
  mounted () {
    this.$store.dispatch('GET_CHEFS_ALL')
      .then((response) => {
        console.log(`success view chefs ${response}`)
      }).catch(error => {
        console.log(`fail errors view chefs ${error}`)
      })
  }
}
</script>
