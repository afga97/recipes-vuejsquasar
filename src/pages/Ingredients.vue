<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <c-button v-bind="buttonSuccess" @click="modalOption(!modalIngredient.open)"/>
        <q-table
          title="Ingredients"
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
          <!-- <q-td slot="body-cell-categorie" slot-scope="props" :props="props"> {{ props.row.categorie.name }}</q-td> -->
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <q-btn color="orange" @click.prevent="" icon="create" :size="'xs'" />
            <q-btn color="red" @click.prevent="" icon="cancel" :size="'xs'" />
          </q-td>
        </q-table>
        <q-dialog v-model="modalIngredient.open">
          <q-card style="width: 1000px; max-width: 80vw;">
            <q-card-section class="row items-center">
              <div class="text-h6">{{ $t('ingredients.title', { msg: $t(`chef.crud[${modalIngredient.option}]`) }) }} </div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
              <form class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      :label="$t('ingredients.name')"
                      :error="errors.has('name')"
                      :error-message="errors.first('name')"
                      v-model="form.ingredient.name"
                      v-validate="'required'"
                      name="name"
                      :data-vv-as="$t('ingredients.name')"
                      color="primary" />
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      :label="$t('ingredients.description')"
                      :error="errors.has('description')"
                      :error-message="errors.first('description')"
                      v-model="form.ingredient.description"
                      v-validate="'required'"
                      name="description"
                      :data-vv-as="$t('ingredients.description')"
                      color="primary" />
                  </div>
                  <div class="col-md-11 col-xs-12">
                    <q-select
                      v-model="form.ingredient.categorie"
                      use-chips
                      input-debounce="0"
                      use-input
                      :label="$t('ingredients.categorie')"
                      :options="optionsCategories"
                      @filter="getCategories"
                      @filter-abort="abortGetCategories"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:append>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-1 col-xs-3">
                    <q-btn
                      v-if="optionsCategories"
                      label="Reset"
                      color="primary"
                      @click="cleanCategorie"
                    ></q-btn>
                  </div>
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
import ingredientService from '../services/ingredients'
import { Notify } from 'quasar'

export default {
  name: 'Ingredients',
  mixins: [DataTable],
  components: { CButton, HomePage },
  data () {
    return {
      url: 'recipes/ingredients/',
      submitting: false,
      optionsCategories: null,
      form: {
        ingredient: {
          name: '',
          description: '',
          categorie: ''
        }
      },
      modalIngredient: {
        open: false,
        option: 0
      },
      columns: [
        { name: 'name', align: 'left', label: this.$t('ingredients.name'), field: 'name', sortable: false },
        { name: 'description', align: 'left', label: this.$t('ingredients.description'), field: 'description', sortable: false },
        { name: 'categorie', align: 'left', label: this.$t('ingredients.categorie'), field: 'categorie', sortable: false },
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
  methods: {
    modalOption (value) {
      this.modalIngredient.open = value
      if (value) {
        this.form.ingredient = Object.assign({})
        this.modalIngredient.option = 0
        this.optionsCategories = null
      }
    },
    simulateSubmit () {
      this.submitting = true
      this.$validator.validateAll().then((response) => {
        if (response) {
          ingredientService.save(this.form.ingredient).then((response) => {
            this.submitting = false
            this.modalIngredient = false
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
    editIngredient (id) {
      ingredientService.edit(id).then((response) => {
        this.form.ingredient = Object.assign(response.data)
        this.modalIngredient.open = true
        this.modalIngredient.option = 2
      }, (error) => {
        console.log(error)
      })
    },
    updateIngredient () {
      this.$validator.validateAll().then((response) => {
        if (response) {
          ingredientService.update(this.form.ingredient).then((response) => {
            this.submitting = false
            this.modalIngredient.open = false
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
    deleteIngredient () {
      let config = Message.messageOptions({ 'type': 'red', 'message': 'Desea eliminar el chef', 'position': 'center', 'actions': true })
      Notify.create(config)
    },
    alertDelete () {
      alert('Hola')
    },
    getCategories (val, update, abort) {
      if (this.optionsCategories !== null) {
        update()
        return
      }
      update(() => {
        let optionsC = []
        ingredientService.getCategories().then((response) => {
          response.data.results.map(function (obj) {
            optionsC.push({ value: obj.id, label: obj.name })
          })
        })
        this.optionsCategories = optionsC
      })
    },
    abortGetCategories () {
      console.log('delayed filter aborted')
    },
    cleanCategorie () {
      this.optionsCategories = null
      this.form.ingredient.categorie = null
    }
  }
}
</script>
