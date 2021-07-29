import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/auth.layout.vue'),
    children: [{ path: 'login', component: () => import('pages/auth/login.page.vue') }],
  },

  {
    path: '/app',
    component: () => import('layouts/loader.layout.vue'),
    children: [
      { path: 'pcat', component: () => import('pages/pcat/pcat-list.page.vue') },
      { path: 'pcat/create', component: () => import('pages/pcat/pcat-create.page.vue') },
      { path: 'pcat/:id/update', component: () => import('pages/pcat/pcat-update.page.vue'), props: true }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
