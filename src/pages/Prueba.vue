<template>
  <div class="q-pa-md">
    <c-button v-bind="buttonSuccess"/>
    <q-table
      title="Chefs"
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
  </div>
</template>
<script>

import ChefService from '../services/chef'
import BtnTooltip from '../components/BtnTooltip.vue'
import CButton from '../components/CButton.vue'

export default {
  name: 'Prueba',
  components: { BtnTooltip, CButton },
  data () {
    return {
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
          console.log(response)
          this.pagination.rowsNumber = response.data.count
          this.data = response.data.results
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.loading = false
        }, (err) => {
          console.log(err)
        })
    }
  }
}
</script>
