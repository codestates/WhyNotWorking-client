import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface NavState {
  notificationStatus: { [key: string]: boolean };
}

const initialState: NavState = {
  notificationStatus: { inbox: false, achivement: false },
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    closeNotification: (state) => {
      state.notificationStatus = {};
    },
    openNotification: (state, action: PayloadAction<string>) => {
      state.notificationStatus = {};
      state.notificationStatus[action.payload] = true;
    },
  },
});

export const { closeNotification, openNotification } = navSlice.actions;
export const selectNav = (state: RootState) => state.nav.notificationStatus;

export default navSlice.reducer;
