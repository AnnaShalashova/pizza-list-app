import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { changeEmployees, getEmployees, selectEmployees } from '../../redux/Employees/employeesSlice';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useParams } from 'react-router-dom';
import {
  changeEmployer,
  clearEmployerState,
  getEmployerDetails,
  selectEmployer,
} from '../../redux/Employees/employerDetailsSlice';
import { isEmpty } from 'lodash';
import { MuiTelInput } from 'mui-tel-input';
import { Button, CircularProgress, Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const EmployerDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employerId } = useParams();
  const { data: employer, loading } = useSelector(selectEmployer);
  const employees = useSelector(selectEmployees);

  useEffect(() => {
    dispatch(getEmployerDetails(employerId));
    return () => dispatch(clearEmployerState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employerId]);

  useEffect(() => {
    if (isEmpty(employees)) dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);

  const handleChangeEmployer = (e) => {
    const noTarget = !e?.target;
    if (noTarget) return;

    const { name, value } = e.target;
    dispatch(changeEmployer({ id: employerId, data: { [name]: value } }));
  };

  const handleChangePhone = (value) => {
    dispatch(changeEmployer({ id: employerId, data: { phone: value } }));
  };

  const saveEmployer = () => {
    dispatch(changeEmployees({ id: employerId, employer }));
  };

  return (
    <Container className="employees-wrapper" maxWidth="xs">
      <h1 className="title">
        Детальная<span>.</span>
      </h1>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => navigate('/')}
        sx={{ position: 'fixed', left: '0', top: '45%' }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Card sx={{ minHeight: '300px' }}>
        {loading ? (
          <Grid container justifyContent="center" sx={{ height: '300px' }} alignItems="center">
            <Grid>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ p: 2, 'text-align': 'center' }} mb={3}>
            <TextField
              sx={{ mb: '20px', width: '35ch' }}
              id="input-with-icon-textfield"
              label="ФИО"
              name="name"
              onChange={handleChangeEmployer}
              value={employer.name || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              sx={{ mb: '25px', width: '35ch' }}
              name="birthday"
              onChange={handleChangeEmployer}
              label="Дата рождения"
              value={employer.birthday || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <MuiTelInput
              sx={{ mb: '35px', width: '35ch' }}
              value={employer.phone || ''}
              name="phone"
              onChange={handleChangePhone}
              onlyCountries={['RU']}
              defaultCountry="RU"
              inputProps={{ maxLength: 13 }}
              forceCallingCode
            />

            <FormControl sx={{ width: 150 }}>
              <InputLabel sx={{ top: '-5px' }}>Должность</InputLabel>
              <Select
                size="small"
                name="role"
                value={employer.role || ''}
                onChange={handleChangeEmployer}
                input={<OutlinedInput label="Должность" />}
                MenuProps={MenuProps}
              >
                <MenuItem value="cook">Повар</MenuItem>
                <MenuItem value="waiter">Официант</MenuItem>
                <MenuItem value="driver">Водитель</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              name="isArchive"
              sx={{ 'margin-left': '30px' }}
              control={<Checkbox size="small" />}
              label="в архиве"
              checked={employer.isArchive || false}
              onChange={() => dispatch(changeEmployer({ id: employerId, data: { isArchive: !employer.isArchive } }))}
            />
            <Button sx={{ mt: '20px' }} size="large" variant="text" onClick={saveEmployer}>
              Сохранить
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default EmployerDetailsPage;
