import { rupiah } from 'src/serv/currency'

export const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'author',
    align: 'left',
    field: (row: any) => row.author.name,
    label: 'Admin',
    required: true,
  },
  {
    name: 'customer',
    align: 'left',
    field: (row: any) => row.targetUser.name,
    label: 'Pelanggan',
    required: true,
  },
  {
    name: 'grandTotal',
    align: 'left',
    field: 'grandTotal',
    label: 'Grand Total',
    format: (v: any) => rupiah(v),
    required: true,
  },
  {
    name: 'status',
    align: 'left',
    field: 'orderStatus',
    label: 'status',
    required: true,
  },
  {
    name: 'actions',
    align: 'right',
    field: 'id',
    label: '',
  },
];
