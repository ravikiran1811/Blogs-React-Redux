import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../Slices/CounterSlice";
import BlogsReducer from "../Slices/BlogsSlice";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    blogs: BlogsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
