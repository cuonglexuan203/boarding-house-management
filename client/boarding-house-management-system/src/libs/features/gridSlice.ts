import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGridStatus {
  selectedRowId: number;
}

const initialState: IGridStatus = {
  selectedRowId: 0,
};

const gridStatusSlice = createSlice({
  name: 'gridStatus',
  initialState,
  reducers: {
    setSelectedRowId: (state: IGridStatus, payload: PayloadAction<number>) => {
      state.selectedRowId = payload.payload;
    },
    refreshSelectedRowId: (state: IGridStatus) => {
      state.selectedRowId = 0;
    },
  },
});

export const { setSelectedRowId, refreshSelectedRowId } =
  gridStatusSlice.actions;
export default gridStatusSlice.reducer;
