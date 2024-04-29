import styles from "./Trending.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";

function Trending() {
  return (
    <div className={styles.Home}>
      <Header className={styles.navbar} />
      <div className={styles.body}>
        <Sidebar page={1} className={styles.Sidebar} />
        <div className={styles.content}>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Trending;
