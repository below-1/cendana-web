import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/auth.layout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/login.page.vue') },
      { path: 'register', component: () => import('pages/auth/register.page.vue') }
    ],
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

      { path: 'opex', component: () => import('pages/opex/opex-list.page.vue') },
      { path: 'opex/create', component: () => import('pages/opex/opex-create.page.vue') },
      { path: 'opex/:id/update', component: () => import('pages/opex/opex-update.page.vue'), props: true },

      { path: 'tcat', component: () => import('pages/tcat/tcat-list.page.vue') },
      { path: 'tcat/create', component: () => import('pages/tcat/tcat-create.page.vue') },
      { path: 'tcat/:id/update', component: () => import('pages/tcat/tcat-update.page.vue'), props: true },

      { path: 'customer', component: () => import('pages/customer/customer-list.page.vue') },
      { path: 'customer/:id/update', component: () => import('pages/customer/customer-update.page.vue'), props: true },
      { path: 'customer/create', component: () => import('pages/customer/customer-create.page.vue') },
      { path: 'supplier', component: () => import('pages/supplier/supplier-list.page.vue') },
      { path: 'supplier/create', component: () => import('pages/supplier/supplier-create.page.vue') },
      { path: 'supplier/:id/update', component: () => import('pages/supplier/supplier-update.page.vue'), props: true },
      { path: 'product', component: () => import('pages/product/product-list.page.vue') },
      { path: 'product/create', component: () => import('pages/product/product-create.page.vue') },
      { path: 'product/:id/update', component: () => import('pages/product/product-update.page.vue'), props: true },
      { path: 'purchase', component: () => import('pages/purchase/purchase-list.page.vue') },
      { path: 'purchase/create', component: () => import('pages/purchase/purchase-create.page.vue') },
      { 
        path: 'purchase/:id/detail', 
        component: () => import('pages/purchase/purchase-detail.page.vue'), 
        props: true,
        children: [
          { path: 'update', component: () => import('pages/purchase/purchase-update.page.vue'), props: true },
          { path: 'seal', component: () => import('pages/purchase/purchase-seal.page.vue'), props: true },
        ]
      },
      { path: 'sale', component: () => import('pages/sale/sale-list.page.vue') },
      { path: 'sale/create', component: () => import('pages/sale/sale-create.page.vue') },
      { path: 'sale/:id/detail', 
        component: () => import('pages/sale/sale-detail.page.vue'), 
        props: true,
        children: [
          { path: 'items/:saleItemId', component: () => import('components/sale/update-sale-item.vue'), props: true },
        ]
      },
      { 
        path: 'stock-items/order/:order',
        component: () => import('pages/sitem/sitem-order.page.vue'),
        props: true
      },
      { 
        path: 'stock-items/order/:order/add',
        component: () => import('pages/sitem/sitem-add.page.vue'),
        props: true
      }
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
