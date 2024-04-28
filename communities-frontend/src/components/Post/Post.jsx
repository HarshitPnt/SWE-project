import styles from "./Post.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function Post() {
  return (
    <div className={styles.Post}>
      <div className={styles.post_header}>
        <div className={styles.post_header_left}>
          <img
            src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            alt="user"
            className={styles.post_header_img}
          />
          <div className={styles.post_header_info}>
            <span className={styles.post_header_info_name}>r/programming</span>
            <span className={styles.post_header_info_time}>
              Posted by u/username 1 day ago
            </span>
          </div>
        </div>
        <div className={styles.post_header_right}>
          <button className={styles.post_header_right_btn}>Join</button>
        </div>
      </div>
      <hr />
      <div className={styles.post_body}>
        <div className={styles.post_body_title}>Title</div>
        <div className={styles.post_body_text}>
          Hello this is my first post on this platform named communites
        </div>
      </div>
      <hr />
      <hr />
      <div className={styles.post_footer}>
        <div className={styles.post_footer_left}>
          <button className={styles.post_footer_left_btn}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button className={styles.post_footer_left_btn}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className={styles.post_footer_right}>
          <button className={styles.post_footer_right_btn}>
            <FontAwesomeIcon icon={faComment} />
          </button>
          <button className={styles.post_footer_right_btn}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
