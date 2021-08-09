<template>
  <q-dialog :model-value="true" persistent>
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Edit Pembelian</h6>
      </div>
      <q-separator/>
      <q-card-section v-if="purchase.type == 'loading'">
      </q-card-section>
      <q-card-section v-else>
        <q-select
          outlined
          label="Supplier"
          class="q-mb-md"
          option-label="name"
          option-value="id"
          emit-value
          :display-value="selectedSupplier.name"
          :options="suppliers"
          v-model="payload.targetUserId"
        />
        <q-input
          outlined
          label="Pajak"
          class="q-mb-md"
          v-model.number="payload.tax"
          type="number"
        />
        <rupiah-input
          label="Biaya Pengiriman"
          v-model="payload.shipping"
        />
        <q-input
          outlined
          label="Diskon"
          class="q-mb-md"
          v-model.number="payload.discount"
          type="number"
        />
        <q-btn 
          @click="onSubmit"
          :loading="loading"
          label="Simpan" square unelevated dark color="primary">
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent, 
  onMounted, 
  PropType, 
  computed, 
  Ref,
  toRef, 
  ref, 
  unref, 
  reactive
} from 'vue'
import { useDetailPurchase, useUpdate } from 'src/compose/purchase'
import { useListSupplier } from 'src/compose/supplier'
import RupiahInput from 'components/rupiah-input.vue'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    RupiahInput
  },
  setup(props) {
    const id = toRef(props, 'id')

    const {
      purchase,
      getPurchase
    } = useDetailPurchase(id)

    const payload = reactive({
      targetUserId: 0,
      tax: 0,
      discount: 0,
      shipping: '0'
    })


    const { suppliers, getSuppliers } = useListSupplier()
    const selectedSupplier = computed(() => {
      const id = payload.targetUserId
      const supplier = suppliers.value.find(it => it.id == id)
      if (!supplier) return {
        name: '--'
      }
      return supplier
    })

    onMounted(() => {
      getPurchase()
        .then((val: any) => {
          payload.targetUserId = val.item.targetUserId
        })
      getSuppliers()
    })

    const { update, loading } = useUpdate()
    const onSubmit = () => {
      update(id.value, payload)
    }

    return {
      suppliers,
      payload,
      selectedSupplier,
      purchase,
      onSubmit,
      loading
    }
  }
})
</script>
