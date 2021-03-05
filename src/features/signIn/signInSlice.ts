import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";

interface UserInfo {
  aboutMe: string | null;
  email: string | null;
  image: string | null;
  location: string | null;
  nickname: string | null;
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

export const loginAsync = (userInfo: {
  email: string;
  password: string;
}): AppThunk => (dispatch) => {
  const data: string = JSON.stringify(userInfo);

  axios({
    method: "post",
    url: "http://localhost:4000/login/",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  }).then(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/users/",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((usersResponse) => {
      dispatch(login(usersResponse.data.data));
    });
  });
};

export default signInSlice.reducer;
