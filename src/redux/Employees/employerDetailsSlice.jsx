import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getEmployerDetails = createAsyncThunk('employer/getEmployerDetails', async (employerId) => {
  const employer = await fetch(`https://localhost:5173/employees/${employerId}`);
  const parsed = await employer.json();
  return parsed;
});

const initialState = {
  data: {},
  errors: false,
  loading: false,
};

const employerDetailSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    changeEmployer: (state, action) => {
      const { data } = action.payload;
      state.data = { ...state.data, ...data };
    },
    clearEmployerState: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployerDetails.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getEmployerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployerDetails.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      });
  },
});

export const selectEmployer = (state) => state.employer;
export const { changeEmployer, clearEmployerState } = employerDetailSlice.actions;
export default employerDetailSlice;
