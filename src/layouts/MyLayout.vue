<template>
  <q-layout view="hHr Lpr lfr">
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
          Recipes World
        </q-toolbar-title>

        <!-- <div class="q-pa-md q-gutter-y-md"> -->
          <div class="q-gutter-sm">
            <div class="q-pa-md">
              <q-btn-dropdown
                class="glossy"
                color="primary"
                label="Account Settings"
              >
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                </div>
                <q-separator vertical inset class="q-mx-lg" />
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
                  </q-avatar>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">Sr. Andrés Giraldo</div>
                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                  />
                </div>
              </div>
              </q-btn-dropdown>
            </div>
          </div>
        <!-- </div> -->
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
            <q-icon name="bookmarks" />
          </q-item-section>
          <q-item-section>Ingredients</q-item-section>
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
