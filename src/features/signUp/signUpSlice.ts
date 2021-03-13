import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../app/store";
import { login } from "../signIn/signInSlice";

export const gitHubSignUp = (authorizationCode: any): AppThunk => (
  dispatch
) => {
  let token = "";
  console.log(authorizationCode);
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
      let token = res.data.accessToken;
      let accessToken = res.data.accessToken.split(" ")[2];
      console.log("token::    " + token + "     ,authtoken:   " + accessToken);
      axios
        .get("https://api.github.com/user", {
          headers: {
            authorization: `token ${accessToken}`,
          },
          withCredentials: true,
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
            .post(`${process.env.REACT_APP_SERVER_HOST}/sign/`, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then((name) => {
              axios
                .get(
                  `${process.env.REACT_APP_SERVER_HOST}/users/myInfo?nickname=${name}`,
                  {
                    headers: {
                      authorization: token,
                    },
                  }
                )
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
