<template>
  <q-table 
    hide-pagination
    :columns="columns"
    :rows="items"
    :rows-per-page-options="[0]"
    flat
  >
  </q-table>
</template>

<script lang="ts">
import { 
  defineComponent,
  PropType,
  computed,
  onMounted
} from 'vue'
import { useFilterEntity } from 'src/compose/entity'
import { displayDateTime } from 'src/serv/datetime'
import { rupiah } from 'src/serv/currency'

const columns = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'waktu',
    align: 'left',
    field: 'createdAt',
    format: displayDateTime,
    label: 'Waktu',
    required: true,
  },
  {
    name: 'nominal',
    align: 'left',
    field: 'nominal',
    format: rupiah,
    label: 'Mominal',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  }
]

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  setup(props) {
    return {
      columns
    }
  }
})
</script>
