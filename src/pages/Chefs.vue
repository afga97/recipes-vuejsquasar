<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <c-button v-bind="buttonSuccess" @click="modalOption(!modalChef.open)"/>
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
            <q-btn color="orange" @click.prevent="editChef(props.row.id)" icon="create" :size="'xs'" />
            <q-btn color="red" @click.prevent="deleteChef()" icon="cancel" :size="'xs'" />
          </q-td>
        </q-table>
        <q-dialog v-model="modalChef.open">
          <q-card style="width: 1000px; max-width: 80vw;">
            <q-card-section class="row items-center">
              <div class="text-h6">{{ $t('chef.title', { msg: $t(`chef.crud[${modalChef.option}]`) }) }}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
              <form class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      :label="$t('chef.name')"
                      :error="errors.has('name')"
                      :error-message="errors.first('name')"
                      v-model="form.chef.name"
                      v-validate="'required'"
                      name="name"
                      :data-vv-as="$t('chef.name')"
                      color="primary" />
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      :label="$t('chef.surname')"
                      :error="errors.has('surname')"
                      :error-message="errors.first('surname')"
                      v-model="form.chef.surname"
                      v-validate="'required'"
                      name="surname"
                      color="primary" />
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      :label="$t('chef.age')"
                      :error="errors.has('age')"
                      :error-message="errors.first('age')"
                      v-model="form.chef.edad"
                      v-validate="'required|integer'"
                      name="age"
                      color="primary" />
                  </div>
                </div>
                <div class="row justify-end">
                  <q-btn :class="'justify-end'" no-caps :loading="submitting" color="blue" v-if="!form.chef.id" @click.prevent="simulateSubmit()">{{ $t('chef.buttons[0]')}}</q-btn>
                  <q-btn :class="'justify-end'" no-caps :loading="submitting" color="blue" v-if="form.chef.id" @click.prevent="updateChef()">{{ $t('chef.buttons[1]')}}</q-btn>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </q-page>
  </div>
</template>
<script>
import Message from '../mixins/noty'
import DataTable from '../mixins/dataTable'
import CButton from '../components/CButton.vue'
import HomePage from './Home.vue'
import chefService from '../services/chef'
import { Notify } from 'quasar'

export default {
  name: 'Chefs',
  mixins: [DataTable],
  components: { CButton, HomePage },
  data () {
    return {
      url: 'recipes/chefs/',
      submitting: false,
      form: {
        chef: {
          name: '',
          surname: '',
          edad: ''
        }
      },
      modalChef: {
        open: false,
        option: 0
      },
      columns: [
        { name: 'name', align: 'left', label: this.$t('chef.name'), field: 'name', sortable: false },
        { name: 'surname', align: 'left', label: this.$t('chef.surname'), field: 'surname', sortable: false },
        { name: 'edad', align: 'left', label: this.$t('chef.age'), field: 'edad', sortable: false },
        { name: 'actions', align: 'left', label: this.$t('chef.actions'), field: 'actions', sortable: false, style: 'width: 220px' }
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
        label: this.$t('chef.crud[0]'),
        size: 'md'
      }
    }
  },
  mounted () {
    console.log(this.$i18n.locale)
  },
  methods: {
    modalOption (value) {
      this.modalChef.open = value
      if (value) {
        this.form.chef = Object.assign({})
        this.modalChef.option = 0
      }
    },
    simulateSubmit () {
      this.submitting = true
      this.$validator.validateAll().then((response) => {
        if (response) {
          chefService.save(this.form.chef).then((response) => {
            this.submitting = false
            this.modalChef = false
            this.onRequest({ pagination: this.pagination })
            this.form.chef = Object.assign({})
            Message.message({ 'type': 'green', 'message': ' Chef registrado correctamente', 'timeout': 5 })
          }, (error) => {
            this.submitting = false
            console.log(error.response.data)
          })
        } else {
          this.submitting = false
        }
      })
    },
    editChef (id) {
      chefService.edit(id).then((response) => {
        this.form.chef = Object.assign(response.data)
        this.modalChef.open = true
        this.modalChef.option = 2
      }, (error) => {
        console.log(error)
      })
    },
    updateChef () {
      this.$validator.validateAll().then((response) => {
        if (response) {
          chefService.update(this.form.chef).then((response) => {
            this.submitting = false
            this.modalChef.open = false
            this.onRequest({ pagination: this.pagination })
            Message.message({ 'type': 'green', 'message': ' Chef actuliaado correctamente', 'timeout': 5 })
          }, (error) => {
            console.log(error)
          })
        } else {
          console.log('error')
        }
      })
    },
    deleteChef () {
      let config = Message.messageOptions({ 'type': 'red', 'message': 'Desea eliminar el chef', 'position': 'center', 'actions': true })
      Notify.create(config)
    },
    alertDelete () {
      alert('Hola')
    }
  }
}
</script>
