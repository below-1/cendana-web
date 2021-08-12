<template>
  <q-input dense type="number" v-model.number="yearState" label="Tahun" class="q-mr-md" />
  <q-select dense 
    v-model.number="monthState"
    :options="monthOptions"
    :display-value="`${months[monthState - 1]}`"
    emit-value
    label="Bulan" 
    class="q-mr-md"
    style="min-width: 160px;"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useModel } from 'src/compose/commons'

const months = [
  'januari',
  'februari',
  'maret',
  'april',
  'mei',
  'juni',
  'juli',
  'agustus',
  'september',
  'oktober',
  'november',
  'desember'
]
const monthOptions = months.map((name: string, i: number) => ({
  value: i + 1,
  label: name
}))

export default defineComponent({
  props: {
    year: {
      type: Number as PropType<number>,
      required: true
    },
    month: {
      type: Number as PropType<number>,
      required: true
    }
  },
  emits: ['update:year', 'update:month'],
  setup(props, { emit }) {
    const yearState = useModel<number>(props, 'year')
    const monthState = useModel<number>(props, 'month')

    return {
      yearState,
      monthState,
      monthOptions,
      months
    }
  }
})
</script>
