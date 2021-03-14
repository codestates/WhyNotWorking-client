import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.css";
import {
  googleLoginAsync,
  gitHubLoginAsync,
  loginAsync,
  selectIsLogin,
} from "./signInSlice";
import { useHistory, Link } from "react-router-dom";
import { GoogleLoginButton } from "ts-react-google-login-component";
import { gitHubSignUp } from "../signUp/signUpSlice";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isLogin = useSelector(selectIsLogin);
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
    dispatch(googleLoginAsync(id_token));
  };

  //GitHub login
  const githubLogin = () => {
    console.log("loginBtn");
    const gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${gitHubClientId}&redirect_uri=${process.env.REACT_APP_CLIENT_HOST}/signin/`;
    // window.location.assign(GITHUB_LOGIN_URL);
    window.location.href = GITHUB_LOGIN_URL;
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      dispatch(gitHubSignUp(authorizationCode));
    }
  });

  useEffect(() => {
    if (isLogin) history.push("/");
  }, [isLogin, history]);

  //Facebook login
  const responseFacebook = (response: any) => {
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src="https://i.imgur.com/NaIM8Cj.png"
          alt="logo"
          className={styles.logo}
        ></img>
        <script
          src="https://apis.google.com/js/platform.js?onload=init"
          async
          defer
        ></script>
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
            Login with Google
          </div>
        </GoogleLoginButton>
        <div className={styles.gitHubLogin} onClick={githubLogin}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M9 1a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 009 1z"
              fill="white"
            ></path>
          </svg>
          Login with GitHub
        </div>
        {/* <FacebookLogin
          appId="1867750353373817"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        /> */}
        <div className={styles.loginBox}>
          <div>Email</div>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>Password</div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <div
            className={styles.btn}
            onClick={() => {
              dispatch(loginAsync({ email, password }));
            }}
          >
            Log in
          </div>
        </div>
        <div className={styles.signUpLinkBox}>
          <div>Don't have an account? </div>
          <Link to="/signup">
            <div className={styles.signUpLink}> Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
