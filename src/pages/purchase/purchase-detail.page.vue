<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-md">
      <div class="col col-md-6">
        <purchase-detail :purchase="purchase" />
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, computed, toRef, unref } from 'vue'
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

    onMounted(() => {
      getPurchase()
    })

    return {
      purchase,
      open,
      totals
    }
  }
})
</script>
