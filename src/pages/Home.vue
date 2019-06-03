<template>
  <div class="q-gutter-y-md">
    <q-card>
      <q-tabs
          v-model="tab"
          dense
          active-color="primary"
          indicator-color="primary"
          align="justify"
          inline-label
          narrow-indicator
          class="bg-white text-grey shadow-2"
        >
        <q-route-tab
          icon="people"
          to="/chefs/all/"
          label="CHEFS"
          exact
        />
        <q-route-tab
          icon="restaurant"
          to="/recipes/list"
          label="RECIPES"
          exact
        />
        <q-route-tab
          icon="fastfood"
          to="/ingredients/all"
          label="INGREDIENTS"
          exact
        />
      </q-tabs>
      <!-- <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
        </q-tab-panel>
        <q-tab-panel name="alarms">
        </q-tab-panel>
        <q-tab-panel name="movies">
        </q-tab-panel>
      </q-tab-panels> -->
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  data () {
    return {
      tab: 'chefs'
    }
  }
}
</script>
