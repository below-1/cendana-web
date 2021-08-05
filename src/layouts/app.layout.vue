<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ data.app.name }}
        </q-toolbar-title>

        <q-btn-dropdown flat icon="person" :label="user.first_name">
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Ganti Password
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="power_settings_new" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Log Out
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      :mini="leftDrawerMini"
      dark
      show-if-above
      bordered
    >
      <AppMenu
        :baseMenus="baseMenus"
        :adminMenus="adminMenus"
        :role="user.role"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { User } from 'src/models/user.model';
import { baseMenus, adminMenus } from 'src/data/commons/menu.data';
import * as appData from 'src/data/commons/app.data';
import AppMenu from 'components/app-menu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppMenu,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const leftDrawerMini = ref(false);
    const user = inject<User>('user');

    return {
      leftDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawer() {
        leftDrawerMini.value = !leftDrawerMini.value;
      },
      adminMenus,
      baseMenus,
      data: appData,
      user,
    };
  },
});
</script>
