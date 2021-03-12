import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";
import { login } from "../signIn/signInSlice";

export const gitHubSignUp = (authorizationCode: any): AppThunk => (
  dispatch
) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_HOST}/login/githubLogin/`,
      {
        authorizationCode,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      axios
        .get("https://github.com/login/oauth/user", {
          headers: {
            authorization: `token ${res.data.accessToken}`,
          },
        })
        .then((res) => {
          const { name, location, avatar_url, email } = res.data;
          const data = JSON.stringify({
            nickname: name,
            location,
            image: avatar_url,
            email,
          });
          axios
            .post(`${process.env.REACT_APP_SERVER_HOST}/signup/`, data, {
              headers: { "Content-Type": "application/json" },
            })
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
        });
    });
};
