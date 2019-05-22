<template>
  <q-layout view="lhr Lpr lff">
    <q-header elevated id="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Recipes World
        </q-toolbar-title>

        <!-- <div class="q-pa-md q-gutter-y-md"> -->
        <!-- </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
    <div class="column justify-between" accent style="height: 150px; background-image: url(https://cdn-images-1.medium.com/max/310/1*Jie55HRpeCmZpmldgrL2eQ.png)">
      <q-item>
        <q-item-section side>
          <q-avatar size="100px" style="margin-top: 20px;">
            <img src="http://chittagongit.com/images/avatar-icon-png/avatar-icon-png-25.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Agiraagu</q-item-label>
          <q-item-label caption>Administrador</q-item-label>
          <q-btn round color="blue-5" icon="directions" />
        </q-item-section>
      </q-item>
    </div>
      <q-separator />
      <q-list>
        <q-item clickable v-ripple :active="link === 'home'"
        @click="link = 'home'" to="/home" exact active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple :active="link === 'recetas'"
        @click="link = 'recetas'" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>
          <q-item-section>Recipes</q-item-section>
        </q-item>
        <q-expansion-item
        expand-separator
        icon="apps"
        label="Management"
      >
        <q-item clickable v-ripple :active="link === 'ingredientes'"
        @click="link = 'ingredientes'" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>Ingredients</q-item-section>
        </q-item>
        <q-item clickable v-ripple :active="link === 'chefs'"
        @click="link = 'chefs'" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Chefs</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item clickable v-ripple :active="link === 'exit'"
        @click="link = 'exit'" to="/exit" exact active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>Salir</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
        <q-toolbar>
          <div style="padding-bottom:1px">Deveploment by Agiraagu</div>
        </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      link: 'home',
      tema: true,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>
<style scoped>
</style>
