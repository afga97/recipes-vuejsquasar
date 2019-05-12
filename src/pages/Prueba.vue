<template>
  <div>
    <home-page></home-page>
    <div class="q-pa-md">
      <c-button v-bind="buttonSuccess" @click="modalChef = !modalChef"/>
      <q-table
        title="Chefs"
        :separator="'cell'"
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
        <template v-slot:body="props">
          <q-tr :props="props">
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
                <div class="q-pa-md q-gutter-sm">
                  <btn-tooltip v-if="col.name == 'actions'" v-bind="buttonEdit"></btn-tooltip>
                  <btn-tooltip v-if="col.name == 'actions'" v-bind="buttonDelete"></btn-tooltip>
                </div>
              </q-td>
          </q-tr>
        </template>
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
  </div>
</template>
<script>
import Message from '../mixins/noty'
import ChefService from '../services/chef'
import BtnTooltip from '../components/BtnTooltip.vue'
import CButton from '../components/CButton.vue'
import CModal from '../components/CModal.vue'
import CInput from '../components/CInput.vue'
import HomePage from './Home.vue'

export default {
  name: 'Prueba',
  components: { BtnTooltip, CButton, CModal, CInput, HomePage },
  data () {
    return {
      form: {
        chef: {
          name: '',
          surname: '',
          age: ''
        }
      },
      modalChef: false,
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        // { name: 'id', align: 'left', label: 'Code', field: 'id', sortable: false },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
        { name: 'surname', align: 'left', label: 'Surname', field: 'surname', sortable: false },
        { name: 'edad', align: 'left', label: 'Age', field: 'edad', sortable: false },
        { name: 'actions', align: 'left', label: 'Action', field: 'actions', sortable: false, style: 'width: 220px' }
      ],
      data: [],
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
  mounted () {
    this.onRequest({
      pagination: this.pagination
    })
  },
  methods: {
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber } = props.pagination
      this.loading = true
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let startRow = (page - 1) * rowsPerPage
      ChefService.alls(fetchCount, startRow)
        .then((response) => {
          this.pagination.rowsNumber = response.data.count
          this.data = response.data.results
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.loading = false
        }, (err) => {
          console.log(err)
        })
    },
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
