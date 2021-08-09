<template>
  <q-page>

    <q-toolbar class="bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Pelanggan
      </q-toolbar-title>
      <q-input
        placeholder="keyword..."
        v-model="params.keyword"
        hide-hint
        outlined
        dense
        class="q-mr-md"
      />
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
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
                :to="updateUrl(props.row.id)"
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
import { useListCustomer } from 'src/compose/customer'
import { COLUMNS, BASE_APP_URL } from 'src/data/customer'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination
  },
  setup() {
    const { params, result, loading: listLoading, getCustomers } = useListCustomer()
    const loading = computed(() => listLoading.value)
    const updateUrl = (id: any) => `${BASE_APP_URL}/${id}/update`
    onMounted(() => {
      getCustomers()
    })

    const CREATE_URL = `${BASE_APP_URL}/create`

    return {
      result,
      loading,
      CREATE_URL,
      updateUrl,
      COLUMNS,
      params
    }
  }
})
</script>
