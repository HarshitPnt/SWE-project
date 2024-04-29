import styles from "./Post.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function Post({ post }) {
  const handlecommentClick = () => {
    window.location.href = "/post";
  };

  const handleuserclick = () => {
    window.location.href = "/user";
  };

  return (
    <div className={styles.Post}>
      <div className={styles.post_header}>
        <div className={styles.post_header_left}>
          <img
            onClick={handleuserclick}
            src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            alt="user"
            className={styles.post_header_img}
          />
          <div className={styles.post_header_info}>
            <span className={styles.post_header_info_name}>
              {post.username === undefined ? "" : post.username}
            </span>
            <span className={styles.post_header_info_time}>
              Posted by {post.username === undefined ? "" : post.username}
            </span>
          </div>
        </div>
        <div className={styles.post_header_right}>
          <button className={styles.post_header_right_btn}>Join</button>
        </div>
      </div>
      <hr />
      <div className={styles.post_body}>
        <div className={styles.post_body_title}>{post.title}</div>
        <div className={styles.post_body_text}>
          {post.description.length > 100
            ? post.description.slice(0, 100) + "..."
            : post.description}
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
          <button
            onClick={handlecommentClick}
            className={styles.post_footer_right_btn}
          >
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
