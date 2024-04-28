import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header() {
  const [isInputClicked, setIsInputClicked] = useState(false);

  const handleInputClick = () => {
    setIsInputClicked(!isInputClicked);
  };

  const inputClass = isInputClicked ? styles.hidden : styles.search_input;

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.Navbar}>
          <div className={styles.name}>
            <img src="/logo.png" alt="logo" className={styles.icon} />
            <h1>Communities</h1>
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
          <div className={styles.chat_btn}>
            <FontAwesomeIcon icon={faBell} className={styles.chat_img} />
          </div>
          <div className={styles.not_btn}>
            <FontAwesomeIcon icon={faMessage} className={styles.not_img} />
          </div>
          <div className={styles.profile_btn}>
            <img src="/logo.png" alt="" className={styles.profile_img} />
          </div>
        </div>
        <hr className={styles.hr_sidebar} />
      </div>
    </>
  );
}

export default Header;
