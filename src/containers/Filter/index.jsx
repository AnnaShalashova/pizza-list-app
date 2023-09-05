import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/Employees/employeesSlice';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Fragment } from 'react';
import './Filter.scss';

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

export default function Filter() {
  const dispatch = useDispatch();
  const isArchive = useSelector(({ employees }) => employees.filter.isArchive);
  const role = useSelector(({ employees }) => employees.filter.role);
  const roles = useSelector(({ employees }) => employees.roles);

  return (
    <Fragment>
      <FormControl sx={{ width: 150, 'margin-left': 'auto' }}>
        <InputLabel id="demo-multiple-name-label" sx={{ top: '-5px' }}>
          Должность
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          size="small"
          value={role}
          onChange={(e) => dispatch(setFilter({ role: e.target.value }))}
          input={<OutlinedInput label="Должность" />}
          MenuProps={MenuProps}
        >
          {roles.length &&
            roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          <MenuItem key="All" value="">
            Все должности
          </MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        name="isArchive"
        sx={{ 'margin-left': '30px' }}
        control={<Checkbox size="small" />}
        label="в архиве"
        checked={isArchive}
        onChange={() => dispatch(setFilter({ isArchive: !isArchive }))}
      />
      <Fragment></Fragment>
    </Fragment>
  );
}
