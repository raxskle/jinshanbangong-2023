import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const defaultData: { data: Data[] } = { data: [] };

export const dataSlice = createSlice({
  name: "Data",
  initialState: defaultData,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{
        data: Data[];
      }>
    ) => {
      state.data = action.payload["data"].sort(
        (a, b) => (a.id && b.id && a.id - b.id) || 0
      );
    },
  },
});

//
export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
