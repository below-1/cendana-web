<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data {{ ENTITY_NAME }}
      </q-toolbar-title>
      <q-input v-model="params.keyword" hide-hint placeholder="keyword..." />
      <q-btn flat color="primary" label="tambah" icon="add" :to="CREATE_URL" />
    </q-toolbar>

    <loading-pane v-if="showLoading" />

    <template v-else>
      <section class="q-px-lg">
        <q-table
          flat
          hide-pagination
          :columns="COLUMNS"
          :rows="products.items"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="red"
                flat size="xs"
                @click="onRemove(props.row)"
              />
              <q-btn
                :to="generateUpdateURL(props.row.id)"
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
            :total-page="products.totalPage"
          />
        </q-toolbar>
      </section>
    </template>


  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useFilterEntity, useRemoveEntity } from 'src/compose/entity';
import LoadingPane from 'components/loading-pane.vue';
import Pagination from 'components/pagination.vue'
import {
  ENTITY_NAME,
  BASE_APP_URL,
  BASE_API_URL,
  COLUMNS
} from 'src/data/product'

export default defineComponent({
  components: {
    LoadingPane,
    Pagination
  },
  setup() {
    const CREATE_URL = BASE_APP_URL + '/create';

    function generateUpdateURL(id: number) {
      return BASE_APP_URL + `/${id}/update`;
    }

    const {
      params,
      getEntities: getProducts,
      result: products
    } = useFilterEntity({
      url: BASE_API_URL,
      name: 'Produk',
      initialParams: {
        keyword: ''
      }
    })

    onMounted(getProducts)

    const {
      result: removeResult,
      promptRemove
    } = useRemoveEntity(ENTITY_NAME);

    const onRemove = (item: any) => {
      promptRemove(`${BASE_API_URL}/${item.id}`, item.title)
        .then(() => getProducts())
    }

    const showLoading = computed(() => products.value.type == 'loading' || removeResult.value.type == 'loading');

    return {
      COLUMNS,
      ENTITY_NAME,
      CREATE_URL,
      params,
      products,
      generateUpdateURL,
      onRemove,
      showLoading,
    };
  },
});
</script>
