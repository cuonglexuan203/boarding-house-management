import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    toogleValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toogleValue } = statusSlice.actions;
export default statusSlice.reducer;
