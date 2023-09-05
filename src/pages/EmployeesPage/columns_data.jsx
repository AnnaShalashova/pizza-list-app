import moment from 'moment';

const dayInMonthComparator = (v1, v2) => {
  const data1 = new Date(moment(v1, 'DD.MM.YYYY').format('YYYY.MM.DD'));
  const data2 = new Date(moment(v2, 'DD.MM.YYYY').format('YYYY.MM.DD'));
  return data1 - data2;
};

export const columns = [
  {
    field: 'name',
    headerName: 'ФИО',
    width: 250,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'role',
    valueGetter: ({ row }) => {
      if (row.role === 'cook') {
        return 'Повар';
      } else if (row.role === 'driver') {
        return 'Водитель';
      } else if (row.role === 'waiter') {
        return 'Официант';
      }
    },
    headerName: 'Должность',
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'phone',
    headerName: 'Телефон',
    type: 'phone',
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'birthday',
    headerName: 'Дата рождения',
    width: 150,
    filterable: false,
    disableColumnMenu: true,
    // type: 'date',
    sortComparator: dayInMonthComparator,
  },
];
