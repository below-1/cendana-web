<template>
  <template v-for="item in items" :key="item.name">
    <div class="q-mb-md">
      <q-input
        v-if="item.control == 'string'"
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="item.rules"
        outlined
      />
      <q-input
        v-else-if="item.control == 'textarea'"
        type="textarea"
        :model-value="modelValue[item.field]"
        @update:model-value="(v) => onFieldChange(item.field, v)"
        :label="item.label"
        :rules="item.rules"
        outlined
      />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, Ref, PropType, toRefs } from 'vue';
import { FormDescriptor } from 'src/models/form.model';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<FormDescriptor[]>,
      required: true
    },
    modelValue: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    function onFieldChange(key: string, value: any) {
      const result = { ...(modelValue.value as Object), [key]: value };
      emit('update:modelValue', result);
    }
    return {
      onFieldChange
    }
  },
})
</script>
