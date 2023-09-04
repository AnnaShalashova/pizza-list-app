import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async () => {
        const employees = await fetch('https://localhost:5173/employees');
        const parsed = await employees.json();
        return parsed;
    }
)

const initialState = {
    employees: [],
    filter: {
        isArchive: false,
        role: '',
        text: ''
    },
    roles: ['Повар', 'Официант', 'Водитель'],
    loading: false,
    errors: null
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload
        },
        setFilter: (state, action) => {
            state.filter = {...state.filter, ...action.payload}
        },
        changeEmployees: (state, action) => {
            const { id, employer } = action.payload;
            let newEmpls = state.employees.map((emp) => {
                if (emp.id !== +id) return emp;
                return employer;
            });
            state.employees = newEmpls;
        },
        addNewEmployer: (state, action) => {
            let newEmpls = state.employees;
            newEmpls.push(action.payload);
            state.employees = newEmpls;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.fulfilled, (state, { payload }) => {
                state.employees = payload.data;
                state.loading = false;
            })
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmployees.rejected, (state, { error }) => {
                state.error = error;
                state.loading = false;
            })
    }
});


export const selectEmployees = (state) => state.employees;
export const { setEmployees, setFilter, changeEmployees, addNewEmployer } = employeesSlice.actions;
export default employeesSlice;



