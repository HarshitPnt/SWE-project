import styles from "./SinglePost.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";

function SinglePost() {
  return (
    <div className={styles.SinglePost}>
      <Header className={styles.navbar} />
      <div className={styles.body}>
        <Sidebar className={styles.Sidebar} />
        <div className={styles.content}>
          <Post
            post={{
              title: "Title",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id sapien nec purus lacinia aliquet. Sed nec nunc id neque tincidunt accumsan",
              username: "John Doe",
            }}
          />
        </div>
        <div className={styles.CommentBox}>
          <div className={styles.comments}>
            <div className={styles.comment}>
              <div className={styles.commentUser}>
                <span className={styles.commentUsername}>John Doe</span>
                <span className={styles.commentDate}>5 minutes ago</span>
              </div>
              <div className={styles.commentText}>
                Lorem ipsum dolor sit amet
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.commentUser}>
                <span className={styles.commentUsername}>John Doe</span>
                <span className={styles.commentDate}>5 minutes ago</span>
              </div>
              <div className={styles.commentText}>
                Lorem ipsum dolor sit amet
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.commentUser}>
                <span className={styles.commentUsername}>John Doe</span>
                <span className={styles.commentDate}>5 minutes ago</span>
              </div>
              <div className={styles.commentText}>
                Lorem ipsum dolor sit amet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
