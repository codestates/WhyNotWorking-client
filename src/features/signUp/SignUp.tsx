import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SignUp.module.css";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { loginAsync, googleLoginAsync } from "../signIn/signInSlice";
import { gitHubSignUp } from "./signUpSlice";
import { GoogleLoginButton } from "ts-react-google-login-component";
import FacebookLogin from "react-facebook-login";

export function SignUp() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  //GoogleLogin
  const clientConfig = {
    client_id:
      "49247123368-f78m9lgdolhbdurar4q65gurb6a9phmq.apps.googleusercontent.com",
  };

  const preLoginTracking = (): void => {
    console.log("Attemp to login with google");
  };

  const errorHandler = (error: string): void => {
    console.error(error);
  };

  const responseGoogle = (googleUser: any): void => {
    const id_token = googleUser.getAuthResponse(true).id_token;
    // const googleId = googleUser.getId();
    // console.log({ googleId });
    // console.log({ accessToken: id_token });
    dispatch(googleLoginAsync(id_token));
    history.push("/signupDetail");
  };

  //GitHub login
  const githubSignup = () => {
    console.log("signupBtn");
    const gitHubClientId = "aa59a944d3292ef1c420";
    const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${gitHubClientId}&redirect_uri=${process.env.REACT_APP_CLIENT_HOST}/`;
    window.location.assign(GITHUB_LOGIN_URL);
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log(authorizationCode);
    if (authorizationCode) {
      console.log("signup auth code");
      dispatch(gitHubSignUp(authorizationCode));
      history.push("/signupDetail");
    }
  });

  // todo : redux 방식으로 수정
  const signUpSubmit = () => {
    const data = JSON.stringify({
      password,
      email,
      nickname,
    });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    }).then((res) => {
      if (res.status === 200 && email && password) {
        dispatch(loginAsync({ email, password }));
        setMessage(null);
        history.push("/signupDetail");
      } else {
        setMessage(res.data.message);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.descriptionBox}>
        <div className={styles.headline}>Join the Stack Overflow community</div>
        <div className={styles.desc}>
          <svg width="26" height="26">
            <path
              opacity=".5"
              d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
              fill="#0195ff"
            ></path>
            <path
              d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"
              fill="#0195ff"
            ></path>
          </svg>
          Get unstuck — ask a question
        </div>
        <div className={styles.desc}>
          <svg width="26" height="26">
            <path
              d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"
              fill="#0195ff"
            ></path>
            <path
              opacity=".5"
              d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
              fill="#0195ff"
            ></path>
          </svg>
          Unlock new privileges like voting and commenting
        </div>
        <div className={styles.desc}>
          <svg width="26" height="26">
            <path
              d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"
              fill="#0195ff"
            ></path>
            <path
              opacity=".5"
              d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
              fill="#0195ff"
            ></path>
          </svg>
          Save your favorite tags, filters
        </div>
        <div className={styles.desc}>
          <svg width="26" height="26">
            <path
              d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"
              fill="#0195ff"
            ></path>
          </svg>
          Earn reputation and badges
        </div>
      </div>
      <div className={styles.wrapper}>
        <GoogleLoginButton
          responseHandler={responseGoogle}
          clientConfig={clientConfig}
          preLogin={preLoginTracking}
          failureHandler={errorHandler}
          classNames={styles.googleLogin}
        >
          <div>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className={styles.svg}
            >
              <path
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
                fill="#4285F4"
              ></path>
              <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
                fill="#34A853"
              ></path>
              <path
                d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"
                fill="red"
              ></path>
            </svg>
            Sign up with Google
          </div>
        </GoogleLoginButton>
        <div className={styles.gitHubLogin} onClick={githubSignup}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M9 1a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 009 1z"
              fill="white"
            ></path>
          </svg>
          Sign up with GitHub
        </div>
        <div className={styles.loginBox}>
          <link
            href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
          <div>Display name</div>
          {message === "Such nickname already exists" ? (
            <>
              <input
                className={styles.invalidInput}
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                placeholder="&#xf06a;"
              />
              <div className={styles.message}>{message}</div>
            </>
          ) : message === "should send full data" && !nickname ? (
            <>
              <input
                className={styles.invalidInput}
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                placeholder="&#xf06a;"
              />
              <div className={styles.message}>
                Display name cannot be empty.
              </div>
            </>
          ) : (
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setNickname(e.target.value)}
            />
          )}
          <div>Email</div>
          {message === "Such email already exists" ? (
            <>
              <input
                className={styles.invalidInput}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="&#xf06a;"
              />
              <div className={styles.message}>{message}</div>
            </>
          ) : message === "should send full data" && !email ? (
            <>
              <input
                className={styles.invalidInput}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="&#xf06a;"
              />
              <div className={styles.message}>Email cannot be empty.</div>
            </>
          ) : (
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <div>Password</div>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.btn} onClick={signUpSubmit}>
            Sign up
          </div>
        </div>
        <div className={styles.signUpLinkBox}>
          <div>Already have an account? </div>
          <Link to="/signin">
            <div className={styles.signUpLink}> Log in</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
