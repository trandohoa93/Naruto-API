import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/search/searchSlice";
import cardSlice from "../features/card/cardSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    card: cardSlice,
  },
});
