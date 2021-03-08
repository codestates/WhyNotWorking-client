import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SignIn.module.css";
import { login, loginAsync, selectIsLogin } from "./signInSlice";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) history.push("/");
  });

  const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=`;

  const githubLogin = () => {
    window.location.assign(GITHUB_LOGIN_URL);
  };

  interface Response {
    tokenObj: {
      id_token: string;
    };
  }
  const responseGoogle = (response: Response) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_HOST}/login/googleLogin/`,
        {
          token: response.tokenObj.id_token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_HOST}/users/`)
          .then((res: any) => {
            dispatch(login(res));
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  // const logInSubmit = () => {
  //   const data = JSON.stringify({
  //     password,
  //     email,
  //   });
  //   axios({
  //     method: "post",
  //     url: "https://localhost:4000/login/",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data,
  //   })
  //     .then(() => {
  //       axios.get("https://localhost:4000/users/").then((res: any) => {
  //         dispatch(login(res));
  //         history.push("/");
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <svg
          className={styles.logo}
          aria-hidden="true"
          width="32"
          height="37"
          viewBox="0 0 32 37"
        >
          <path d="M26 33v-9h4v13H0V24h4v9h22z" fill="#BCBBBB"></path>
          <path
            d="M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z"
            fill="#F48024"
          ></path>
        </svg>

        <GoogleLogin
          clientId=".apps.googleusercontent.com"
          render={(renderProps) => (
            <div className={styles.googleLogin} onClick={renderProps.onClick}>
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
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
          )}
          buttonText="Login"
          // onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className={styles.gitHubLogin} onClick={() => githubLogin}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M9 1a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 009 1z"
              fill="white"
            ></path>
          </svg>
          Login with GitHub
        </div>
        <div className={styles.faceBookLogin}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M3 1a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2V3a2 2 0 00-2-2H3zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5z"
              fill="white"
            ></path>
          </svg>
          Login with Facebook
        </div>
        <div className={styles.loginBox}>
          <div>Email</div>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>Password</div>
          <input

            type="text"
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
          <div className={styles.signUpLink}> Sign up</div>
        </div>
      </div>
    </div>
  );
}
