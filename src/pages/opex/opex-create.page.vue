<template>
  <q-page>

    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Tambah Beban Usaha
      </q-toolbar-title>
      <q-btn flat color="primary" label="tambah" icon="add" />
    </q-toolbar>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LoadingPane from 'components/loading-pane.vue'

export default defineComponent({
  components: {
    LoadingPane,
  }
})
</script>
