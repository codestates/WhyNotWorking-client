import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";
import { login } from "../signIn/signInSlice";

export const gitHubSignUp = (authorizationCode: any): AppThunk => (
  dispatch
) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_HOST}/login/githubToken`,
      {
        authorizationCode,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      let accessToken = res.data.accessToken;
      axios
        .get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${accessToken}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          const { name, location, avatar_url, id } = res.data;

          const data = JSON.stringify({
            nickname: name,
            location,
            image: avatar_url,
            email: id,
          });
          axios
            .post(
              `${process.env.REACT_APP_SERVER_HOST}/login/githubLogin`,
              data,
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((response) => {
              axios
                .get(`${process.env.REACT_APP_SERVER_HOST}/users/myInfo`, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: response.data.accessToken,
                  },
                })
                .then((res: any) => {
                  dispatch(login(res.data.data));
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        });
    });
};
