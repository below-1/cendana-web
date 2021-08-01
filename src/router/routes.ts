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
      { path: 'pcat/:id/update', component: () => import('pages/pcat/pcat-update.page.vue'), props: true },
      { path: 'ocat', component: () => import('pages/ocat/ocat-list.page.vue') },
      { path: 'ocat/create', component: () => import('pages/ocat/ocat-create.page.vue') },
      { path: 'ocat/:id/update', component: () => import('pages/ocat/ocat-update.page.vue'), props: true },
      { path: 'product', component: () => import('pages/product/product-list.page.vue') },
      { path: 'product/create', component: () => import('pages/product/product-create.page.vue') },
      { path: 'product/:id/update', component: () => import('pages/product/product-update.page.vue'), props: true },
      { path: 'purchase', component: () => import('pages/purchase/purchase-list.page.vue') },
      { path: 'purchase/create', component: () => import('pages/purchase/purchase-create.page.vue') },
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
