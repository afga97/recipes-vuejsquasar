<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <c-button v-bind="buttonSuccess" @click="modalChef = !modalChef"/>
        <q-table
          title="Chefs"
          :separator="'none'"
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
          @request="onRequest"
          binary-state-sort
        >
          <!-- <template v-slot:top>
            <h6>Chefs</h6>
          </template> -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <p>Opciones</p>
          </q-td>
        </q-table>
        <c-modal :title="'Crear Chef'" :open="modalChef" @close="modalChef = !modalChef" :size="'medium'">
          <form class="q-pa-md">
            <div class="row q-col-gutter-sm">
              <div class="col-md-4 col-xs-12">
                <c-input
                      v-model="form.chef.name"
                      :label="'Name'" :iconprepend="'arrow_right'"
                      :filled="true"
                      :type="'text'"/>
              </div>
              <div class="col-md-4 col-xs-12">
                <c-input
                      v-model="form.chef.surname"
                      :label="'Surname'" :iconprepend="'arrow_right'"
                      :filled="true"
                      :type="'text'"/>
              </div>
              <div class="col-md-4 col-xs-12">
                <c-input
                      v-model="form.chef.age"
                      :label="'Age'" :iconprepend="'arrow_right'"
                      :filled="true"
                      :type="'number'"/>
              </div>
            </div>
            <br>
            <div class="row justify-end">
              <c-button v-bind="buttonSave" @click="simulateSubmit"></c-button>
            </div>
          </form>
        </c-modal>
      </div>
    </q-page>
  </div>
</template>
<script>
import Message from '../mixins/noty'
import DataTable from '../mixins/dataTable'
// import ChefService from '../services/chef'
import CButton from '../components/CButton.vue'
import CModal from '../components/CModal.vue'
import CInput from '../components/CInput.vue'
import HomePage from './Home.vue'

export default {
  name: 'Prueba',
  mixins: [DataTable],
  components: { CButton, CModal, CInput, HomePage },
  data () {
    return {
      url: 'recipes/chefs/',
      form: {
        chef: {
          name: '',
          surname: '',
          age: ''
        }
      },
      modalChef: false,
      columns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
        { name: 'surname', align: 'left', label: 'Surname', field: 'surname', sortable: false },
        { name: 'edad', align: 'left', label: 'Age', field: 'edad', sortable: false },
        { name: 'actions', align: 'left', label: 'Action', field: 'actions', sortable: false, style: 'width: 220px' }
      ],
      buttonEdit: {
        type: 'button',
        color: 'warning',
        size: 'xs',
        icon: 'create',
        tooltipText: 'Edit',
        self: 'center right',
        tshow: 'flip-right',
        thide: 'flip-left'
      },
      buttonDelete: {
        type: 'button',
        color: 'negative',
        size: 'xs',
        icon: 'close',
        tooltipText: 'Delete',
        self: 'center right',
        tshow: 'flip-right',
        thide: 'flip-left'
      },
      buttonSuccess: {
        type: 'button',
        color: 'primary',
        label: 'Create',
        size: 'md'
      },
      buttonSave: {
        color: 'primary',
        round: false,
        size: 'md',
        submitting: false,
        label: 'Save',
        type: 'submit'
      }
    }
  },
  methods: {
    simulateSubmit () {
      this.buttonSave.submitting = true
      setTimeout(() => {
        this.buttonSave.submitting = false
      }, 3000)
      Message.message({ 'type': 'green', 'message': ' Chef registrado correctamente', 'timeout': 5 })
    }
  }
}
</script>
