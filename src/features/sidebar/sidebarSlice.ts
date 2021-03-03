import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface sidebarState {
  currentPage: string;
}

const initialState: sidebarState = {
  currentPage: "/",
};

export const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = sidebar.actions;

export const selectSidebar = (state: RootState) => state.sidebar.currentPage;

export default sidebar.reducer;
