import React from "react";
import { useState, useRef } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
// import axios from "axios";
// import url from "../../../url.js";
import GoogleButton from "react-google-button";
import Modal from "react-modal";

const InvalidUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.popup}>
        <h2>Invalid User</h2>
        <p>Please check your credentials and try again.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default function Register() {
  const [style, setStyle] = useState(styles.no_error);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const [pwd, setPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleRegister = async () => {
    // const data = {
    //   display_name: nameRef.current.value,
    //   password: passRef.current.value,
    // };
    // // let res = await axios.post(`${url.axios_url}/user`,data)
    // setUserName("ll");
    // setStyle(styles.error);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src="/logo.png" />
        </div>
        <div className={styles.sub_main}>
          <h2 className={styles.h2_css}>Register</h2>

          <form className="login-form">
            <label className={styles.label_css} htmlFor="email">
              Name
            </label>
            <input
              ref={nameRef}
              className={styles.input_css}
              type="text"
              placeholder="Your Name"
              id="text"
              name="email"
            />
            <label className={styles.label_css} htmlFor="email">
              email
            </label>
            <input
              ref={emailRef}
              className={styles.input_css}
              type="email"
              placeholder="Your Name"
              id="text"
              name="email"
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
                src={isRevealPwd ? "/show.svg" : "/hide.svg"}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
          </form>
          <button className={styles.button_css} onClick={handleRegister}>
            Register
          </button>
          <InvalidUserModal isOpen={showModal} onClose={handleCloseModal} />
          <div className={style}>Your User Name is</div>
          <h4 className={styles.h4_css}>Already have an account ?</h4>
          <button
            className={styles.butt}
            type="Sign In"
            onClick={() => setStyle(styles.no_error)}
          >
            Log In
          </button>
          <div className={styles.google}>
            <GoogleButton />
          </div>
        </div>
      </div>
    </>
  );
}
