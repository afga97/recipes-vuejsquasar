<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <div class="row justify-center">
          <div class="col-md-6 col-xs-12">
            <q-input rounded outlined v-model="filter" label="Search">
              <template v-slot:append>
                <q-btn round dense flat icon="search" @click="searchRecipes" @keyup.enter="searchRecipes"/>
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="cancel" v-if="clearIconSearch" @click="filter = null"/>
              </template>
            </q-input>
            <br>
          </div>
          <q-card class="principal">
            <p
              class="row justify-end text-overline" id="information"
            >Mostrando {{ totalImages }} de {{ recipesScroll.totalRecipes }}</p>
            <q-infinite-scroll
              @load="onLoad"
              :scroll-target="$refs.scrollTarget"
              :disable="scrolldisabled"
            >
              <div class="row justify-center" v-for="(recipe, index) in recipes" :key="index">
                <q-card class="my-card justify-center">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="../assets/img/ico_user_recipe.png">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>Andrés Giraldo</q-item-label>
                      <q-item-label>{{ recipe.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <img :src="recipe.image">
                  <!-- <q-card-section>
                    <div class="text-h6">{{ item.name }}</div>
                    <div class="text-subtitle2">{{ item.author }}</div>
                  </q-card-section>-->
                  <q-card-section>
                    {{ recipe.description }}
                    <q-expansion-item
                      group="somegroup"
                      icon="explore"
                      label="Ingredientes"
                      header-class="text-primary">
                        <q-card>
                          <q-card-section>
                            <q-chip dense color="primary" text-color="white"> arroz</q-chip>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                            eveniet doloribus ullam aliquid.
                          </q-card-section>
                        </q-card>
                    </q-expansion-item>
                  </q-card-section>
                  <q-card-actions align="around">
                    <q-btn flat round color="black" icon="remove_red_eye"/>
                  </q-card-actions>
                </q-card>
              </div>
              <!-- <div class="scroll-target"></div> -->
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px"/>
                </div>
              </template>
            </q-infinite-scroll>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>
<script>
import HomePage from './Home.vue'
import recetaService from '../services/recipes'

export default {
  name: 'Recipes',
  components: { HomePage },
  data () {
    return {
      scrolldisabled: false,
      showMenuSearch: false,
      filter: null,
      clearIconSearch: false,
      recipes: [],
      recipesMenuSearch: [],
      recipesScroll: {
        initialRecipes: 3,
        limit: 4,
        offset: 4,
        totalRecipes: 0
      }
    }
  },
  mounted () {
    this.initialṔage()
  },
  computed: {
    totalImages: function () {
      return this.recipes.length
    }
  },
  watch: {
    filter: function () {
      if (this.filter == null || this.filter === '') {
        this.initialṔage()
        this.clearIconSearch = false
      } else {
        this.clearIconSearch = true
      }
    }
  },
  methods: {
    initialṔage () {
      recetaService.alls(`?limit=${this.recipesScroll.initialRecipes}&offset=0&ordering=id`).then(response => {
        this.recipesScroll.totalRecipes = response.data.count
        this.recipes = response.data.results
        this.recipesScroll.offset = response.data.results.length
      }, (error) => {
        console.log(error.response.data)
      })
    },
    onLoad (index, done) {
      var query = `?limit=${this.recipesScroll.limit}&offset=${this.recipesScroll.offset}&ordering=id`
      if (this.recipes.length >= this.recipesScroll.initialRecipes) {
        if (this.recipesScroll.totalRecipes > this.recipes.length) {
          if (this.filter != null) {
            query = `?name__icontains=${this.filter}&limit=${this.recipesScroll.limit}&offset=${this.recipesScroll.offset}&ordering=id`
          }
          recetaService
            .alls(query)
            .then(response => {
              response.data.results.map(recipe => {
                this.recipes.push({
                  name: recipe.name,
                  image: recipe.image,
                  description: recipe.description
                })
              })
              done()
              this.recipesScroll.offset = this.recipes.length
            })
        } else {
          done(true)
        }
      } else {
        done(true)
      }
    },
    searchRecipes () {
      recetaService.searhRecipes(`name__icontains=${this.filter}&limit=${this.recipesScroll.initialRecipes}&offset=0&ordering=id`).then((response) => {
        this.recipes = []
        this.recipesScroll.totalRecipes = response.data.count
        this.recipes = response.data.results
        this.recipesScroll.offset = this.recipes.length
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 523px;
  margin-top: 18px;
  margin-bottom: 18px;
}

#information {
  padding-top: 14px;
  // padding-right: 44px;
}

.principal {
  width: 856px;
}
</style>
