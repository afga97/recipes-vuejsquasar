<template>
    <q-page padding>
        <c-data-table :columns="columns" :data="tableData" :id="'id'" :value="filter">
          <template slot="search">
            <c-input v-model="filter" :icon="'search'"
            :placeholder="'Search'" :counter="false"></c-input>
          </template>
          <template slot="actions">
            <div class="q-pa-xs q-gutter-sm">
              <c-button v-bind="btnSuccess"></c-button>
              <btn-tooltip v-bind="buttonInfoTooltip"></btn-tooltip>
            </div>
          </template>
        </c-data-table>
        <br><br>
        <c-input v-model="other"
            :label="'Example'" :counter="false" :maxlength="10" :cleaned="true" :filled="true" @cleaned="cleandInput"></c-input>
        <br>
        <c-button v-bind="btnSuccess"></c-button>
        <br><br>
        <btn-tooltip v-bind="buttonInfoTooltip"></btn-tooltip>

        <br><br>
        <form @submit.prevent="simulateSubmit" class="q-pa-md">
          <c-input v-model="test"
            :label="'Example'" :counter="false" :iconprepend="'person'" :icon="'person'" :maxlength="10" :filled="true" @cleaned="cleandInput"></c-input>
          <div class="row justify-end">
            <c-button v-bind="btnSuccess" @submit.prevent="simulateSubmit"></c-button>
          </div>
        </form>
    </q-page>
</template>
<script>
import CDataTable from '../components/CDataTable.vue'
import CInput from '../components/CInput.vue'
import CButton from '../components/CButton.vue'
import BtnTooltip from '../components/BtnTooltip.vue'

export default {
  name: 'Chef',
  components: {
    CDataTable,
    CInput,
    CButton,
    BtnTooltip
  },
  data () {
    return {
      test: '',
      btnSuccess: {
        color: 'primary',
        outline: false,
        round: false,
        size: 'md',
        submitting: false,
        label: 'Guardar',
        type: 'submit'
      },
      buttonInfoTooltip: {
        color: 'primary',
        outline: false,
        round: false,
        size: 'md',
        label: 'Boton con tooltip',
        tooltipText: 'Putos',
        offset: [10, 10],
        self: 'center right',
        tshow: 'flip-right',
        thide: 'flip-left',
        anchor: 'center left',
        contentclass: 'bg-amber text-black shadow-7'
      },
      filter: '',
      other: 'Andres',
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
    },
    cleandInput () {
      this.other = ''
    },
    alertUser () {
      this.$q.notify({
        type: 'positive',
        message: 'Again, the button click works! Awesome!'
      })
    },
    simulateSubmit () {
      console.log('Se hizo submit')
      this.btnSuccess.submitting = true
      setTimeout(() => {
        this.btnSuccess.submitting = false
      }, 3000)
    }
  }
}
</script>
