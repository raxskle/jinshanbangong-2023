import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import tagsReducer from "./tagsSlice";

// 定义store，包含所有slice的reducer
export const store = configureStore({
  reducer: {
    data: dataReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
