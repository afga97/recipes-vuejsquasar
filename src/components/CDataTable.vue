<template>
  <div>
      <q-table
      title="Chefs"
      :data="data"
      :columns="columns"
      :row-key="id"
      :filter="value"
      >
      <template v-slot:top-right>
        <slot name="search"></slot>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="(i, prop) in props.row" :key="prop">
            <div v-if="prop != '__index'">{{ i }}</div>
            <div v-if="prop == '__index'">
              <slot name="actions"></slot>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: [
    'data', 'columns', 'id', 'value'
  ]
}
</script>
