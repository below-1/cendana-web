<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Beban Usaha
      </q-toolbar-title>
      <q-input
        placeholder="keyword..."
        v-model="params.keyword"
        hide-hint
        outlined
        dense
        class="q-mr-md"
      />
      <q-btn flat color="primary" label="tambah" icon="add" />
    </q-toolbar>
    <q-separator/>
    <loading-pane v-if="loading" />
    <template v-else>
      <section>
        <q-table
          hide-pagination
          :columns="COLUMNS"
          :rows="result.items"
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
                icon="edit" color="primary" flat size="xs" />
            </q-td>
          </template>
        </q-table>
      </section>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="result.totalPage"
          />
        </q-toolbar>
      </section>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'
import { useListOpex } from 'src/compose/opex'
import { COLUMNS } from 'src/data/opex'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination,
  },
  setup() {
    const { getOpexes, result, params, loading } = useListOpex()

    onMounted(() => {
      getOpexes()
    })

    return {
      result,
      params,
      loading,
      COLUMNS
    }
  }
})
</script>