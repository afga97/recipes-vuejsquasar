<template>
  <q-layout view="hHr Lpr lFr">
    <q-header elevated>
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
          Quasar App
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
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
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>Recetas</q-item-section>
        </q-item>
        <q-expansion-item
        expand-separator
        icon="apps"
        label="Maestros"
      >
        <q-item clickable v-ripple :active="link === 'ingredientes'"
        @click="link = 'ingredientes'" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="bookmarks" />
          </q-item-section>
          <q-item-section>Ingredientes</q-item-section>
        </q-item>
        <q-item clickable v-ripple :active="link === 'chefs'"
        @click="link = 'chefs'" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Chefs</q-item-section>
        </q-item>
      </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
        <q-toolbar>
          <div style="padding-bottom:1px">Desarrollado por Agiraagu</div>
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
