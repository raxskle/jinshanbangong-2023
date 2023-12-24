import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const defaultTags: { tags: Tag[] } = {
  tags: [],
};

export const tagsSlice = createSlice({
  name: "Tag",
  initialState: defaultTags,
  reducers: {
    setTags: (
      state,
      action: PayloadAction<{
        tags: Tag[];
      }>
    ) => {
      state.tags = action.payload["tags"];
    },
  },
});

//
export const { setTags } = tagsSlice.actions;
export default tagsSlice.reducer;
