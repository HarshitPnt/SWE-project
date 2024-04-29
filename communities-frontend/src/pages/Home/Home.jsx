import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";

function Home() {
  const [logged, setLogged] = useState(true);
  useEffect(() => {
    if (!document.cookie.includes("token")) {
      // Change logged state to false
    }
  }, []);
  return (
    <div className={styles.Home}>
      <Header className={styles.navbar} />
      <div className={styles.body}>
        <Sidebar page={2} className={styles.Sidebar} />
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

export default Home;
