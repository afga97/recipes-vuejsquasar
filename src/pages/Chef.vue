<template>
    <q-page padding>
        <c-data-table :columns="columns" :data="tableData" :id="'id'" :value="filter">
          <template slot="search">
            <c-input v-model="filter" :icon="'search'" :placeholder="'Search'"></c-input>
          </template>
          <template slot="actions">
            <q-btn
              color="primary"
              class="q-px-xs q-py-xs q-mt-ms"
              icon="create"
              @click="create"
            />
          </template>
        </c-data-table>
    </q-page>
</template>

<script>
import CDataTable from '../components/CDataTable.vue'
import CInput from '../components/CInput.vue'

export default {
  name: 'Chef',
  components: {
    CDataTable,
    CInput
  },
  data () {
    return {
      filter: '',
      tabletitle: 'Tabla chefs',
      columns: [
        { name: 'id', align: 'left', label: 'Código', field: 'id', sortable: false },
        { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: false },
        { name: 'actions', align: 'left', label: 'Acciones', field: 'actions', sortable: false }
      ],
      tableData: [
        { id: 1, name: 'Andres' },
        { id: 2, name: 'Felipe' }
      ]
    }
  },
  methods: {
    create () {
      alert('Hola mundo')
      console.log('Hola mundo')
    }
  }
}
</script>
