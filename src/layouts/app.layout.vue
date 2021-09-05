<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white text-dark" style="border-bottom: 1px solid #eee;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />  
        <div class="text-overline" style="line-height: unset;">12 April, 2021</div>
        <q-space/>

        <q-btn-dropdown flat icon="person" :label="user.first_name">
          <q-list separator>
            <q-item to="/app/change-password">
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Ganti Password
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item @click="logout" clickable>
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
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      dark
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
import { useRouter } from 'vue-router'
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
    const router = useRouter()

    function logout() {
      localStorage.removeItem('token')
      router.replace('/')
    }

    return {
      leftDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      adminMenus,
      baseMenus,
      data: appData,
      user,
      logout
    };
  },
});
</script>
