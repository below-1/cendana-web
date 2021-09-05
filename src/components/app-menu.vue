<template>
  <div class="q-px-md q-my-md text-center">
    <h6 
      class="text-weight-bolder q-my-none q-py-none" 
      style="line-height: unset;">UD. Cendana</h6>
  </div>
  <q-list separator>
    <template v-for="menu, i in menus" :key="`app_menu_${i}`">
      <q-item-label
        v-if="menu.separator"
        header
        class="text-capitalize"
      >
        {{ menu.label }}
      </q-item-label>
      <q-item
        v-else
        :to="menu.path"
      >
        <q-item-section avatar>
          <q-icon :name="menu.icon" size="sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-capitalize">{{ menu.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script lang="ts">
import { 
  ref, 
  computed, 
  defineComponent,
  toRefs,
  Ref,
  PropType,
} from 'vue';
import { Menu } from 'src/data/commons/menu.data';

function useMenus(role: Ref<string>, baseMenus: Ref<Menu[]>, adminMenus: Ref<Menu[]>) {
  const menus = computed(() => {
    let menus = [...baseMenus.value];
    if (role.value == 'ADMIN') {
      menus = [...menus, ...adminMenus.value];
    }
    return menus;
  })
  return { menus };
}

export default defineComponent({
  props: {
    role: {
      type: String,
      required: true,
    },
    baseMenus: {
      type: Array as PropType<Menu[]>,
      required: true,
    },
    adminMenus: {
      type: Array as PropType<Menu[]>,
      required: true,
    },
  },
  setup(props) {
    const {
      role,
      baseMenus,
      adminMenus,
    } = toRefs(props);
    return {
      ...useMenus(role, baseMenus, adminMenus),
    };
  },
});
</script>
