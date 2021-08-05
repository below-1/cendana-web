<template>
  <loading-pane v-if="purchase.type == 'loading'" />
  <q-card v-else flat bordered>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Detail Pembelian #{{ purchase.item.id }}
      </q-toolbar-title>
    </q-toolbar>
    <q-list separator>
      <q-item
        v-for="item in detailItems"
        :key="item.label"
      >
        <q-item-section>
          {{ item.label }}
        </q-item-section>
        <q-item-section>
          {{ item.value }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, computed, toRef, unref, Ref } from 'vue'
import LoadingPane from 'components/loading-pane.vue';

export default defineComponent({
  props: {
    purchase: {
      type: Object as PropType<any>,
      required: true
    }
  },
  components: {
    LoadingPane,
  },
  setup(props) {
    const purchase: Ref<any> = toRef(props, 'purchase')
    const detailItems = computed(() => {
      const purchaseVal = unref(purchase)
      if (purchaseVal.type != 'data') {
        return []
      }
      const { item } = purchaseVal
      const items = [
        { label: 'Supplier', value: item.targetUser.name },
        { label: 'Admin Yang Membuka Orderan', value: item.author.name },
        { label: 'Status Pembelian', value: item.orderStatus },
        { label: 'Pajak', value: item.tax },
        { label: 'Biaya Pengiriman', value: item.shipping },
        { label: 'Total', value: item.total },
        { label: 'Grand Total', value: item.grandTotal }
      ]
      return items
    })

    return {
      detailItems
    }
  }
})
</script>