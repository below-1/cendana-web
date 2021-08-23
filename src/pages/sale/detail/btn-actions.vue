<template>
  <div style="display: flex; justify-content: center;">
    <q-btn
      @click="$emit('show-seal')"
      label="Transaksi" 
      outline
      class="q-mr-md"
    />
    <q-btn 
      @click="$emit('show-update')"
      label="Edit"
      outline
      icon="edit" 
    />
  </div>
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
  emits: ['show-update', 'show-seal']
})
</script>