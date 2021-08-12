<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Penjualan
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" :to="createURL" />
    </q-toolbar>

    <q-separator/>

    <div class="q-px-lg flex q-py-md">
      <q-input dense placeholder="keyword..." v-model="params.keyword" class="q-mr-md" />
      <month-select 
        v-model:year="params.year"
        v-model:month="params.month"
      />
    </div>

    <q-separator/>

    <loading-pane v-if="sales.type == 'loading'" />
    <template v-else>
      <q-table
        flat
        hide-pagination
        :columns="COLUMNS"
        :rows="sales.items"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip v-if="props.row.orderStatus == 'OPEN'"
              size="sm"
              color="red" text-color="white">
              Open
            </q-chip>
            <q-chip v-else
              size="sm"
              color="green" text-color="white">
              Locked
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="details"
              color="teal"
              flat 
              size="sm"
              :to="`/app/sale/${props.row.id}/detail`"
            />
            <q-btn
              icon="delete"
              color="red"
              flat 
              size="sm"
            />
          </q-td>
        </template>
      </q-table>
    </template>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ENTITY_NAME, BASE_APP_URL, BASE_API_URL, COLUMNS } from 'src/data/sale'
import MonthSelect from 'components/month-select.vue'
import LoadingPane from 'components/loading-pane.vue'
import { useFilterEntity } from 'src/compose/entity'

export default defineComponent({
  components: {
    MonthSelect,
    LoadingPane,
  },
  setup() {
    const initialParams = {
      year: 2020,
      month: 1,
      keyword: ''
    }
    const createURL = `${BASE_APP_URL}/create`
    const { params, result: sales, getEntities: getSales } = useFilterEntity({
      initialParams,
      url: BASE_API_URL,
      name: ENTITY_NAME
    })

    onMounted(getSales)

    return {
      params,
      sales,
      getSales,
      createURL,
      COLUMNS
    }
  }
})
</script>
