<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Data Pembelian Produk#{{ id }}
        <span 
          v-if="product.type == 'result'" 
          class="text-uppercase text-weight-bold">
          {{ product.data.name }}
        </span>
      </q-toolbar-title>
    </q-toolbar>

    <q-separator/>

    <template v-if="purchases.type == 'data'">
      <q-table 
        :columns="columns"
        :rows="purchases.items"
        :rows-per-page-options="[0]"
        flat
        hide-pagination
      >
        <template v-slot:body-cell-order="props">
          <q-td :props="props">
            <router-link 
              :to="`/app/purchase/${props.row.orderId}/detail`"
            >#{{ props.row.orderId }}</router-link>
          </q-td>
        </template>
      </q-table>
      <q-separator/>
      <section class="q-px-lg">
        <q-toolbar class="text-grey-8 q-py-lg">
          <pagination
            v-model:page="params.page"
            v-model:per-page="params.perPage"
            :total-page="purchases.totalPage"
          />
        </q-toolbar>
      </section>
    </template>

    <loading-pane v-else />

  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  watch,
  onMounted
} from 'vue'
import { format } from 'date-fns'
import { id as LocaleID } from 'date-fns/locale'
import { useListPurchases } from 'src/compose/product'
import { useSingleEntity } from 'src/compose/entity'
import { rupiah } from 'src/serv/currency'
import LoadingPane from 'components/loading-pane.vue'
import Pagination from 'components/pagination.vue'

const columns = [
  {
    name: 'createdAt',
    align: 'left',
    field: 'createdAt',
    label: '',
    required: true,
    format: (v: string) => format(new Date(v), 'd MMMM yyyy, HH:mm', { locale: LocaleID })
  },
  {
    name: 'order',
    align: 'left',
    field: 'orderId',
    label: 'Order',
    required: true,
  },
  {
    name: 'buyPrice',
    align: 'left',
    field: 'buyPrice',
    label: 'Harga Beli',
    required: true,
    format: (v: string) => rupiah(v)
  },
  {
    name: 'sellPrice',
    align: 'left',
    field: 'sellPrice',
    label: 'Harga Jual',
    required: true,
    format: (v: string) => rupiah(v)
  },
  {
    name: 'discount',
    align: 'left',
    field: 'discount',
    label: 'Diskon',
    required: true,
    format: (v: string) => v + '%'
  },
  {
    name: 'available',
    align: 'left',
    field: 'available',
    label: 'Baik',
    required: true
  },
  {
    name: 'defect',
    align: 'left',
    field: 'defect',
    label: 'Rusak',
    required: true
  },
  {
    name: 'quantity',
    align: 'left',
    field: 'quantity',
    label: 'Total',
    required: true
  }
]

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    LoadingPane,
    Pagination
  },
  setup(props) {
    const productId = toRef(props, 'id')

    const {
      result: product,
      getSingleEntity
    } = useSingleEntity('Produk')
    const getProduct = () => 
      getSingleEntity(`/v1/api/products/${productId.value}`)

    const {
      params,
      result: purchases,
      getPurchases
    } = useListPurchases(productId)

    watch(params, getPurchases)
    onMounted(() => {
      getProduct()
      getPurchases()
    })

    return {
      product,
      params,
      purchases,
      columns
    }
  }
})
</script>