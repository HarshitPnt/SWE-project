import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.name}>
          <img src="/logo.png" alt="logo" className={styles.icon} />
          <h1>Communities</h1>
        </div>
        <div className={styles.search_bar}>
          <input
            type="text"
            placeholder="Search"
            className={styles.search_input}
          />
        </div>
        <div className={styles.chat_btn}>
          <img src="/logo.png" alt="" className={styles.chat_img} />
        </div>
        <div className={styles.not_btn}>
          <img src="/logo.png" alt="" className={styles.not_img} />
        </div>
        <div className={styles.profile_btn}>
          <img src="/logo.png" alt="" className={styles.profile_img} />
        </div>
      </div>
      <hr />
    </>
  );
}

export default Header;
