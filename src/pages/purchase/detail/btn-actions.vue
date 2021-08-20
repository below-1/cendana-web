<template>
  <q-btn
    v-if="open"
    :to="sealUrl"
    label="Kunci Pembelian" 
    color="blue" 
    outline
    class="q-mr-md"
  />
  <q-btn 
    v-if="open"
    :to="updateUrl"
    label="edit data pembelian"
    outline
    icon="edit" 
    color="teal" />
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

export default defineComponent({
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    sealUrl: {
      type: String as PropType<string>,
      required: true
    },
    updateUrl: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>