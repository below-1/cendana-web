type HeaderMenu = { separator: true, label: string };
type PathMenu = { path: string, label: string, icon: string };
export type Menu = HeaderMenu | PathMenu;

export const baseMenus: Menu[] = [
  { path: '/app', label: 'dashboard', icon: 'dashboard' },
  { separator: true, label: 'master' },
  { path: '/app/pcat', label: 'kategori barang', icon: 'category' },
  { path: '/app/ocat', label: 'kategori beban operasi', icon: 'category' },
  { path: '/app/product', label: 'gudang', icon: 'bento' },
  { path: '/app/supplier', label: 'supplier', icon: 'bento' },
  { path: '/app/customer', label: 'pelanggan', icon: 'bento' },
  { separator: true, label: 'transaksi' },
  { path: '/app/purchase', label: 'pembelian', icon: 'point_of_sale' },
  { path: '/app/sale', label: 'penjualan', icon: 'point_of_sale' },
  { path: '/app/opex', label: 'beban usaha', icon: 'rowing' },
  { path: '/app/tool', label: 'biaya peralatan', icon: 'production_quantity_limits' },
  { separator: true, label: 'Hutang/Piutang' },
  { path: '/app/ap', label: 'Hutang', icon: 'send_and_archive' },
  { path: '/app/ar', label: 'Piutang', icon: 'monetization_on' },
];

export const adminMenus: Menu[] = [
  { separator: true, label: 'Lain - Lain' },
  { path: '/app/accounts', label: 'akun', icon: 'person' },
  { path: '/app/financial-report', label: 'laporan keuangan', icon: 'bar_chart' },
];
