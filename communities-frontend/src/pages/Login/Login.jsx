import React from "react";
import { useState, useRef } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
// import url from "../../../url";
// import axios from "axios";
import GoogleButton from "react-google-button";

export default function Login() {
  const [style, setStyle] = useState(styles.no_error);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  //   const navigate = useNavigate();

  const handleChange = () => {
    setUsername(nameRef.current.value);
  };

  const handleLogin = async () => {
    const data = {
      user_name: username,
      password: passRef.current.value,
    };
    // const res = await axios.get(`${url.axios_url}/auth`, {
    //   params: data,
    // });
    // if (res.data.outcome == "Fail" || res.data.success == false)
    //   setStyle(styles.error);
    // else {
    //   document.cookie = res.data.token;
    //   navigate(`/?login=true&uid=${username}`);
    // }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src="/logo.png" />
        </div>
        <div className={styles.sub_main}>
          <h2 className={styles.h2_css}>Welcome Back</h2>

          <form className="login-form">
            <label className={styles.label_css} htmlFor="email">
              Username
            </label>
            <input
              ref={nameRef}
              className={styles.input_css}
              type="text"
              placeholder="Your Username"
              id="email"
              name="email"
              onChange={handleChange}
            />
            <label className={styles.label_css} htmlFor="password">
              Password
            </label>
            <div className={styles.pwd_container}>
              <input
                ref={passRef}
                className={styles.input_css}
                name="pwd"
                placeholder="Enter Password"
                type={isRevealPwd ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? "/hide.svg" : "/show.svg"}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
          </form>
          <button className={styles.button_css} onClick={() => handleLogin()}>
            Log In
          </button>
          <div className={style}>Invalid email or password</div>
          <h4 className={styles.h4_css}>Don't have an account ?</h4>
          <button
            className={styles.butt}
            type="Sign In"
            onClick={() => setStyle(styles.no_error)}
          >
            Register
          </button>
          <div className={styles.google}>
            <GoogleButton />
          </div>
        </div>
      </div>
    </>
  );
}
