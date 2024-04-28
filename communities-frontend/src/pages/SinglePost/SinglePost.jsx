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
          <Post />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
