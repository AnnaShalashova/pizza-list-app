import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getEmployees, selectEmployees } from '../../redux/Employees/employeesSlice';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { columns } from './columns_data';
import Filter from '../../containers/Filter';
import './EmployeesPage.scss';
import { filterEmployees } from '../../redux/Employees/utils';
import { isEmpty } from 'lodash';
import { Button, CircularProgress, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, filter, loading } = useSelector(selectEmployees);
  const [employeesFiltered, setEmployeesFiltered] = useState(employees);

  useEffect(() => {
    if (isEmpty(employees)) dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmpty(employees)) return;
    setEmployeesFiltered(filterEmployees(employees, filter));
  }, [filter, employees]);

  const handleRowClick = ({ row }) => {
    navigate(`/employees/${row.id}`);
  };

  const handleAddEmployer = () => {
    navigate('/employees/new');
  };

  return (
    <Container className="employees-wrapper" maxWidth="md" sx={{ pb: '50px' }}>
      <h1 className="title">
        Сотрудники<span>.</span>
      </h1>
      <Card className="employees-card">
        <CardContent>
          <Box mb={3} pl={0.5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              sx={{ width: '400px' }}
              id="input-search"
              label="Поиск"
              variant="standard"
              value={filter?.text || ''}
              onInput={(e) => dispatch(setFilter({ text: e.target.value }))}
            />
            <SearchIcon sx={{ color: 'action.active' }} />
            <Filter />
          </Box>
          <div style={{ height: 400, width: '100%' }}>
            {loading ? (
              <Grid container justifyContent="center" sx={{ height: '100%' }} alignItems="center">
                <Grid>
                  <CircularProgress />
                </Grid>
              </Grid>
            ) : (
              <DataGrid
                rows={employeesFiltered}
                columns={columns}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
              />
            )}
          </div>
          <Button
            sx={{ mt: '10px' }}
            data-uk-tooltip
            title="Добавить сотрудника"
            variant="outline"
            endIcon={<AddIcon sx={{ pb: '3px' }} />}
            onClick={handleAddEmployer}
          >
            Добавить
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeesPage;
