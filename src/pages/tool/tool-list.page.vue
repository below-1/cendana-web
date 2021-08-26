<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Biaya Peralatan
      </q-toolbar-title>
      <q-btn 
        to="/app/tool/create" 
        flat 
        color="primary" 
        label="tambah" 
        icon="add" />
    </q-toolbar>
    <q-separator/>
    <div class="q-px-lg flex q-py-md">
      <q-input dense placeholder="keyword..." v-model="params.keyword" class="q-mr-md" />
      <month-select 
        v-model:year="params.year"
        v-model:month="params.month"
      />
    </div>
    <loading-pane v-if="tools.type == 'loading'" />
    <template v-else-if="tools.type == 'data'">
      <section>
        <q-table
          hide-pagination
          :columns="COLUMNS"
          :rows="tools.items"
          :rows-per-page-options="[0]"
          flat
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="red"
                flat size="xs"
              />
              <q-btn
                :to="`/app/tool/${props.row.id}/update`"
                icon="edit" 
                color="primary" 
                flat 
                size="xs" />
            </q-td>
          </template>
        </q-table>
      </section>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="tools.totalPage"
          />
        </q-toolbar>
      </section>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import MonthSelect from 'components/month-select.vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useFilterEntity } from 'src/compose/entity'
import { COLUMNS } from 'src/data/tool'
import { currentYearMonth } from 'src/serv/datetime'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
    MonthSelect
  },
  setup() {
    const {
      year,
      month
    } = currentYearMonth()

    const initialParams = {
      year,
      month,
      keyword: '',
      type: 'TOOL'
    }
    const {
      params,
      result: tools,
      getEntities: getTools
    } = useFilterEntity({
      name: 'Biaya Peralatan',
      url: '/v1/api/transactions',
      initialParams
    })

    onMounted(() => {
      getTools()
    })

    return {
      tools,
      params,
      COLUMNS
    }
  }
})
</script>
