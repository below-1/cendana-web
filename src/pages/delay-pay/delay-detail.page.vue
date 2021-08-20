<template>
  <q-page>
    <q-toolbar class="bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Detail Hutang #{{ id }}
      </q-toolbar-title>
      <q-input
        placeholder="keyword..."
        v-model="params.keyword"
        hide-hint
        outlined
        dense
        class="q-mr-md"
      />
      <q-btn flat color="primary" label="tambah pembayaran" icon="add" />
    </q-toolbar>
    <q-separator />
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  computed,
  onMounted
} from 'vue'
import {
  useSingleEntityV2
} from 'src/compose/entity'

export default defineComponent({
  props: {
    id: {
      type: [Number, String] as PropType<number | string>,
      required: true
    }
  },
  setup(props) {
    const url = computed(() => `/v1/api/delays/${props.id}`)
    const {
      result: delay,
      getSingleEntity: getDelay
    } = useSingleEntityV2({
      entityName: 'Hutang',
      url
    })

    onMounted(getDelay)

    return {
      delay
    }
  }
})
</script>

