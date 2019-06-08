<template>
  <div>
    <home-page></home-page>
    <q-page padding>
      <div class="q-pa-md">
        <div class="row justify-center">
          <q-card class="principal">
            <p class="row justify-end text-overline">Mostrando 4 de 10</p>
            <q-infinite-scroll @load="onLoad" :scroll-target = "$refs.scrollTarget" :disable="scrolldisabled">
              <div class="row justify-center" v-for="(item, index) in items" :key="index">
                <q-card class="my-card justify-center">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label> {{ item.author }} </q-item-label>
                      <q-item-label caption>{{ item.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <img src="https://cdn.quasar.dev/img/mountains.jpg">
                  <!-- <q-card-section>
                    <div class="text-h6">{{ item.name }}</div>
                    <div class="text-subtitle2">{{ item.author }}</div>
                  </q-card-section> -->
                  <q-card-section>
                    {{ item.description }}
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

export default {
  name: 'Recipes',
  components: { HomePage },
  data () {
    return {
      scrolldisabled: false,
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
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {})
          console.log(`${this.$refs.scrollTarget}`)
          done()
        }
      }, 1000)
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
