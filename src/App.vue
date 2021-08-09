<template>
  <router-view />
</template>

<style>
.q-table th {
  font-size: 0.7rem;
  font-family: monospace;
  font-weight: bold;
}

.q-table tbody td {
  font-size: 0.76rem;
  font-family: monospace;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
})
</script>
