export const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    field: 'id',
    label: 'id',
    required: true,
  },
  {
    name: 'supplier',
    align: 'left',
    field: (row: any) => row.author.name,
    label: 'Admin',
    required: true,
  },
  {
    name: 'supplier',
    align: 'left',
    field: (row: any) => row.targetUser.name,
    label: 'Supplier',
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
