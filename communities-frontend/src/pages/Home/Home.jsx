import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useGetTrending } from "../../hooks/useGetTrending.js";
import axios from "axios";

function Home() {
  const [logged, setLogged] = useState(true);
  const { loading, trending, userDetails } = useGetTrending();
  useEffect(() => {
    console.log(document.cookie);
    if (!document.cookie.includes("token")) {
      setLogged(false);
    }
  }, []);
  useEffect(() => {
    console.log(trending);
  }, [trending]);
  return (
    <div className={styles.Home}>
      <Header className={styles.navbar} loggedIn={logged} />
      <div className={styles.body}>
        <Sidebar page={2} className={styles.Sidebar} />
        <div className={styles.content}>
          {trending.map((post) => (
            <Post
              key={post.id}
              post={{
                title: post.title,
                description: post.content,
                username: "",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
