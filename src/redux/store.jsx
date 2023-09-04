import { combineReducers, configureStore } from '@reduxjs/toolkit';
import employeesSlice from './Employees/employeesSlice';
import employerDetailsSlice from './Employees/employerDetailsSlice';

export const store = configureStore({
    reducer: combineReducers({
        [employeesSlice.name]: employeesSlice.reducer,
        [employerDetailsSlice.name]: employerDetailsSlice.reducer,

    })
})