import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";

export interface UserInfo {
  aboutMe: string | null;
  email: string | null;
  image: string | null;
  location: string | null;
  nickname: string | null;
  id: number | null;
}

interface SignInState {
  user: UserInfo | null;
  isLogin: boolean;
}

const initialState: SignInState = {
  user: null,
  isLogin: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { login, logout } = signInSlice.actions;

export const selectUserInfo = (state: RootState) => state.signIn.user;
export const selectIsLogin = (state: RootState) => state.signIn.isLogin;

export const loginAsync = (userInfo: {
  email: string;
  password: string;
}): AppThunk => (dispatch) => {
  const data: string = JSON.stringify(userInfo);

  axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_HOST}/login/`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  }).then(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((usersResponse) => {
      dispatch(login(usersResponse.data.data));
      localStorage.setItem("user", JSON.stringify(usersResponse.data.data));
    });
  });
};

export const logoutAsync = (): AppThunk => (dispatch) => {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_HOST}/logout/`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    dispatch(logout());
    localStorage.clear();
  });
};

export default signInSlice.reducer;
