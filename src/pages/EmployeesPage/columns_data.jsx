export const columns = [
    {
        field: 'name',
        headerName: 'ФИО',
        width: 250,
        filterable: false,
        disableColumnMenu: true
    },
    {
        field: 'role',
        valueGetter: ({row}) => {
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
        disableColumnMenu: true
    },
    {
        field: 'phone',
        headerName: 'Телефон',
        type: 'phone',
        width: 150,
        disableColumnMenu: true
    },
];