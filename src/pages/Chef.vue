<template>
  <q-page padding>
    <div class="q-pa-md">
      <c-button v-bind="buttonSuccess" @click="openModal" />
      <c-data-table :columns="columns" :data="chefs" :id="'id'" :value="filter" :title="'Chefs'">
        <template slot="search">
          <c-input v-model="filter" :icon="'search'"
          :placeholder="'Search'" :counter="false"></c-input>
        </template>
        <template slot="actions">
          <div class="q-pa-md q-gutter-sm">
            <btn-tooltip v-bind="buttonEdit" @click="edit"></btn-tooltip>
            <btn-tooltip v-bind="buttonDelete"></btn-tooltip>
          </div>
        </template>
      </c-data-table>
    </div>
    <c-modal :title="'Crear Chef'" :open="modalChef" @close="closeModal" :size="'medium'">
      <p v-for="n in 10" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam. t. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam t. Rer</p>
    </c-modal>
  </q-page>
</template>

<script>
import CDataTable from '../components/CDataTable.vue'
import CInput from '../components/CInput.vue'
import BtnTooltip from '../components/BtnTooltip.vue'
import CButton from '../components/CButton.vue'
import CModal from '../components/CModal.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Chef',
  components: {
    CDataTable,
    CInput,
    BtnTooltip,
    CButton,
    CModal
  },
  data () {
    return {
      filter: '',
      modalChef: false,
      sizeModal: 'small',
      columns: [
        { name: 'id', align: 'left', label: 'Code', field: 'id', sortable: false },
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
        offset: [5, 10],
        self: 'center right',
        tshow: 'flip-right',
        thide: 'flip-left',
        anchor: 'center left',
        contentclass: 'bg-gray1 text-white text-subtitle1 shadow-7'
      },
      buttonDelete: {
        type: 'button',
        color: 'negative',
        size: 'xs',
        icon: 'close',
        tooltipText: 'Delete',
        offset: [5, 10],
        self: 'center right',
        tshow: 'flip-right',
        thide: 'flip-left',
        anchor: 'center right',
        contentclass: 'bg-gray1 text-white text-subtitle1 shadow-7'
      },
      buttonSuccess: {
        type: 'button',
        color: 'primary',
        label: 'Create',
        size: 'md'
      }
    }
  },
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
  },
  methods: {
    edit () {
      alert('Editar')
    },
    openModal () {
      this.modalChef = true
    },
    closeModal () {
      this.modalChef = false
    }
  }
}
</script>
