import React from "react";
import { useState, useRef } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
// import url from "../../../url";
import axios from "axios";
import GoogleButton from "react-google-button";
import Modal from "react-modal";

const Incorrect = ({ isOpen, onClose, error }) => {
  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.popup}>
        <h2>Incorrect Password</h2>
        <p>{error}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default function Login() {
  const [style, setStyle] = useState(styles.no_error);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  //   const navigate = useNavigate();

  const handleChange = () => {
    setUsername(nameRef.current.value);
  };
  const [showModal, setShowModal] = useState(false);
  const handleIncorrect = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = async () => {
    const data = {
      username: username,
      password: passRef.current.value,
    };
    console.log("HERER");
    const res = await axios
      .post(`http://localhost:8080/login`, data)
      .then((res) => {
        console.log(res);
        if (res.data.msg === "Login successful") {
          console.log("Login successful");
          document.cookie = `token=${res.data.token}`;
          navigate("/home");
        }
        if (res.data.msg === "Incorrect password") {
          setStyle(styles.error);
        }
      })
      .catch((err) => {
        console.log("HERE");
        handleIncorrect();
      });
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
          <button
            className={styles.button_css}
            onClick={() => {
              console.log("HERE");
              handleLogin();
            }}
          >
            Log In
          </button>
          <Incorrect isOpen={showModal} onClose={handleCloseModal} />
          <div className={style}>Invalid email or password</div>
          <h4 className={styles.h4_css}>Don't have an account ?</h4>
          <Link to="/register">
            <button
              className={styles.butt}
              type="Sign In"
              onClick={() => setStyle(styles.no_error)}
            >
              Register
            </button>
          </Link>
          <div className={styles.google}>
            <GoogleButton />
          </div>
        </div>
      </div>
    </>
  );
}
