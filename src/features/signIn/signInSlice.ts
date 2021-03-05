import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface SignInState {
  user: object | null;
}

const initialState: SignInState = {
  user: null,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload.data;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = signInSlice.actions;

export const selectUserInfo = (state: RootState) => state.signIn.user;

export default signInSlice.reducer;
