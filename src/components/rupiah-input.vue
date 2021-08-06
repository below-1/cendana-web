<template>
  <q-input
    filled
    class="q-mb-md"
    :model-value="displayed"
    @keyup="onKeyUp"
    :label="label"
    :rules="rules"
    :readonly="readonly"
    prefix="Rp, "
  />
</template>

<script lang="ts">
import { 
  defineComponent,
  computed,
  PropType,
  toRef,
  reactive,
  unref,
  Ref
} from 'vue';
import Decimal from 'decimal.js'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>
    },
    label: {
      type: String as PropType<string>
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    rules: {
      type: Array as PropType<any[]>,
      default: []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const modelValue: Ref<string | undefined> = toRef(props, 'modelValue')

    const displayed = computed(() => {
      const s = unref(modelValue)
      if (!s) return '0';
      const parts = s.split('.')
      let first = parts[0]
      let last = ''
      if (parts.length > 1) {
        last = parts[1]
      }
      const parsed = parseInt(first)
      if (isNaN(parsed)) {
        return '0';
      }
      const separated = parsed.toLocaleString('id')
      let result = separated
      if (last) {
        result = result + ',' + last
      }
      return result
    })

    function onKeyUp(event: any) {
      const s = event.target.value
      const v = s.replaceAll('.', '').replace(',', '.')
      try {
        const d = new Decimal(v)
        const result = d.toString()
        console.log(`result = ${result}`)
        emit('update:modelValue', d.toString())
      } catch (err) {
      }
    }

    return {
      onKeyUp,
      displayed
    }
  }
})
</script>