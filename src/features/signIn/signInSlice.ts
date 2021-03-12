import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";

export interface UserInfo {
  aboutMe: string | undefined;
  email: string | null;
  image: string | undefined;
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
  })
    .then(() => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_HOST}/users/myInfo`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((usersResponse) => {
          console.log(usersResponse.data.data);

          dispatch(login(usersResponse.data.data));
          localStorage.setItem("user", JSON.stringify(usersResponse.data.data));
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((error) => {
      console.log(error);
      // alert("회원정보가 일치하지 않습니다.");
    });
};

export const googleLoginAsync = (token: any): AppThunk => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_HOST}/login/googleLogin/`,
      {
        token,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/users/myInfo`)
        .then((res: any) => {
          dispatch(login(res.data.data));
          localStorage.setItem("user", res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

export const gitHubLoginAsync = (authorizationCode: any): AppThunk => (
  dispatch
) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_HOST}/login/githubLogin/`)
    .then(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/users/myInfo`)
        .then((res: any) => {
          dispatch(login(res.data.data));
          localStorage.setItem("user", res.data.data);
        })
        .catch((error) => {
          console.log(error);
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
