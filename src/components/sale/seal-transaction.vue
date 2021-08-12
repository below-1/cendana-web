<template>
  <q-dialog :model-value="true" persistent>
    <q-card flat bordered style="width: 500px;">
      <div class="q-pa-sm">
        <h6 class="q-my-none">Kunci Penjualan</h6>
      </div>
      <q-separator/>
      <q-card-section v-if="sale.type == 'loading'">
      </q-card-section>
      <q-card-section v-else>
        <div class="text-weight-bold">
          Pembelian #{{ sale.item.id }}
        </div>
        <q-select
          class="q-mb-md"
          outlined
          label="Metode Pembayaran"
          :options="PAYMENT_METHOD_OPTIONS"
          v-model="payload.paymentMethod"
        />
        <rupiah-input
          label="Total Bayar"
          v-model="payload.nominal"
        />

        <template v-if="needDelay">
          <rupiah-input
            label="Total Hutang"
            readonly
            :model-value="debt.toString()"
          />

          <q-input
            class="q-mb-md"
            outlined
            label="Batas Waktu Pembayaran Hutang"
            type="number"
            v-model.number="payload.elapsedDelay"
            min="0"
          />
        </template>

        <q-btn
          @click="onSubmit"
          :loading="sealLoading"
          label="simpan"
          unelevated
          color="blue"
          dark
        />


      </q-card-section>
      <q-separator/>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    sale: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['done'],
  setup(props, { emit }) {

  }
})
</script>
