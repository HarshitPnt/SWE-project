import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
  faRightFromBracket,
  faSearch,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/Cookies/getToken";

function Header({ loggedIn }) {
  const [isInputClicked, setIsInputClicked] = useState(false);

  const handleInputClick = () => {
    setIsInputClicked(!isInputClicked);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const toggleDropdown = () => {
    console.log("toggleDropdown");
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  useEffect(() => {
    if (loggedIn) {
      let { username, token } = getToken();
      console.log(loggedIn);
      if (token === undefined || username === undefined) {
        // window.location.href = "/login";
        return;
      }
      // verify token
      axios
        .get(`http://localhost:8080/verifyToken`, {
          params: {
            token: token,
            username: username,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.msg === "Token verified") {
            // console.log("Token is valid");

            // get user details
            axios
              .get(`http://localhost:8080/user/username/${username}`)
              .then((res) => {
                console.log(res.data);
                setUser(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("Token is invalid");
            // window.location.href = "/login";
          }
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/login";
        });
    }
  }, []);

  const inputClass = isInputClicked ? styles.hidden : styles.search_input;

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Navbar}>
          <div className={styles.name}>
            <img src="/logo.png" alt="logo" className={styles.icon} />
            <Link to="/">
              <h1>Communities</h1>
            </Link>
          </div>
          <div className={styles.search_bar}>
            <FontAwesomeIcon icon={faSearch} className={styles.search_img} />
            <input
              type="text"
              placeholder="Search"
              className={inputClass}
              onClick={handleInputClick}
            />
          </div>
          {loggedIn && (
            <>
              <div className={styles.chat_btn}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={styles.chat_img}
                />
              </div>
              <div className={styles.not_btn}>
                <Link to={`/user/${user.id}`}>
                  <FontAwesomeIcon icon={faHouse} className={styles.not_img} />
                </Link>
              </div>
              <div className={styles.not_btn}>
                <FontAwesomeIcon icon={faBell} className={styles.not_img} />
              </div>
              <div className={styles.not_btn}>
                <Link to="/chat">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className={styles.not_img}
                  />
                </Link>
              </div>
              <div className={styles.profile_btn}>
                <img
                  src={
                    !user.profile_picture
                      ? "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
                      : user.profile_picture
                  }
                  alt="pic"
                  className={styles.profile_img}
                />
              </div>
            </>
          )}
          {!loggedIn && (
            <div className={styles.login_btn_div}>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          )}
        </div>
        <hr className={styles.hr_sidebar} />
      </div>
    </>
  );
}

export default Header;
