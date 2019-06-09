<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <div class="row justify-center">
          <q-card class="principal">
            <p class="row justify-end text-overline">Mostrando {{ totalImages }} de {{ recipesScroll.totalRecipes }}</p>
            <q-infinite-scroll @load="onLoad" :scroll-target = "$refs.scrollTarget" :disable="scrolldisabled">
              <div class="row justify-center" v-for="(recipe, index) in recipes" :key="index">
                <q-card class="my-card justify-center">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="../assets/img/ico_user_recipe.png">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption> Andrés Giraldo </q-item-label>
                      <q-item-label>{{ recipe.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <img :src="recipe.image">
                  <!-- <q-card-section>
                    <div class="text-h6">{{ item.name }}</div>
                    <div class="text-subtitle2">{{ item.author }}</div>
                  </q-card-section> -->
                  <q-card-section>
                    {{ recipe.description }}
                  </q-card-section>
                  <q-card-actions align="around">
                    <q-btn flat round color="red" icon="favorite" />
                    <q-btn flat round color="teal" icon="bookmark" />
                  </q-card-actions>
                </q-card>
              </div>
              <!-- <div class="scroll-target"></div> -->
              <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
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
      recipes: [],
      recipesScroll: {
        initialRecipes: 3,
        limit: 4,
        offset: 4,
        totalRecipes: 0
      },
      items: [
        {
          name: 'Arroz con huevo',
          author: 'Andres Giraldo',
          description: 'Alimenta mucho',
          image: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
        {
          name: 'Arroz con platano',
          author: 'Tu papito',
          description: 'Alimenta mucho',
          image: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
        {
          name: 'Arroz con cebolla',
          author: 'Rosa maria',
          description: 'Alimenta mucho',
          image: 'https://cdn.quasar.dev/img/mountains.jpg'
        }
      ]
    }
  },
  mounted () {
    recetaService.alls(this.recipesScroll.initialRecipes).then((response) => {
      this.recipesScroll.totalRecipes = response.data.count
      this.recipes = response.data.results
      this.recipesScroll.offset = response.data.results.length
    }, (error) => {
      console.log(error.response.data)
    })
  },
  computed: {
    totalImages: function () {
      return this.recipes.length
    }
  },
  methods: {
    onLoad (index, done) {
      if (this.recipes.length >= this.recipesScroll.initialRecipes) {
        if (this.recipesScroll.totalRecipes > this.recipes.length) {
          recetaService.alls(this.recipesScroll.limit, this.recipesScroll.offset).then((response) => {
            response.data.results.map((recipe) => {
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 523px
  margin-top: 18px;
  margin-bottom: 18px;

.principal
  width 856px
</style>
