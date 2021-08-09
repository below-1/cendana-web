<template>
  <q-page>
    <q-toolbar class="bg-grey-2 q-px-lg q-py-md">
      <q-toolbar-title>
        Detail Pembelian #{{ id }}
      </q-toolbar-title>
      <q-btn
        v-if="open"
        :to="sealPurchaseURL"
        label="Kunci Pembelian" 
        color="blue" 
        dark 
        unelevated />
    </q-toolbar>

    <q-separator/>

    <div class="q-pa-lg">

      <div class="row q-mb-xl">
        <div class="col col-md-6">
          <q-card bordered flat>
            <q-toolbar class="bg-grey-2">
              <q-btn 
                v-if="open"
                :to="updatePurchaseURL"
                outline
                label="edit data pembelian"
                icon="edit" 
                color="teal" />
            </q-toolbar>
            <q-card-section>
              <div class="flex" style="justify-content: space-between; align-items: center;">
                <div class="text-weight-bold">Detail Pembelian #{{id}}</div>
              </div>
            </q-card-section>
            <q-separator/>
            <purchase-detail :purchase="purchase" />
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <purchase-stock-item
            :order-id="id"
            :open="open"
            :totals="totals" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </q-page>
</template>

<script lang="ts">
import { 
  defineComponent, 
  onMounted, 
  PropType, 
  computed, 
  toRef, 
  ref, 
  unref,
  provide
} from 'vue'
import { useRoute } from 'vue-router'
import { useDetailPurchase } from 'src/compose/purchase'
import PurchaseDetail from 'components/purchase/purchase-detail.vue'
import PurchaseStockItem from 'components/sitem/purchase-stock-item.vue'
import { rupiah } from 'src/serv/currency'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    PurchaseDetail,
    PurchaseStockItem
  },
  setup(props) {
    const id = toRef(props, 'id');
    const {
      purchase,
      getPurchase
    } = useDetailPurchase(id)

    provide('purchase', purchase)

    const open = computed(() => {
      const purchaseVal = unref(purchase)
      if (purchaseVal.type != 'data') {
        return false
      }
      const result = purchaseVal.item.orderStatus == 'OPEN'
      return result
    })
    const totals = computed(() => {
      const purchaseVal = unref(purchase)
      if (purchaseVal.type != 'data') {
        return {
          total: '0',
          subTotal: '0',
          grandTotal: '0'
        }
      }
      return {
        total: rupiah(purchaseVal.item.total),
        subTotal: rupiah(purchaseVal.item.subTotal),
        grandTotal: rupiah(purchaseVal.item.grandTotal)
      }
    })
    const showPurchaseEditor = ref(false)
    const togglePurchaseEditor = () => {
      showPurchaseEditor.value = !showPurchaseEditor.value
    }

    const route = useRoute()
    const updatePurchaseURL = computed(() => route.fullPath + '/update')
    const sealPurchaseURL = computed(() => route.fullPath + '/seal')

    onMounted(() => {
      getPurchase()
    })

    return {
      purchase,
      open,
      totals,
      updatePurchaseURL,
      sealPurchaseURL
    }
  }
})
</script>
