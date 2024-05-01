import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useGetTrending } from "../../hooks/useGetTrending.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [logged, setLogged] = useState(true);
  const { loading, trending, userDetails } = useGetTrending();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(document.cookie);
    if (!document.cookie.includes("token")) {
      setLogged(false);
      navigate("/");
    }
  }, []);
  useEffect(() => {
    console.log(trending);
  }, [trending]);
  return (
    <div className={styles.Home}>
      <Header className={styles.navbar} loggedIn={logged} />
      <div className={styles.body}>
        <Sidebar page={2} className={styles.Sidebar} loggedIn={logged} />
        <div className={styles.content}>
          {trending.map((post) => (
            <Post
              key={post.post.post.id}
              post={{
                title:
                  post.post && post.post.post
                    ? post.post.post.title
                    : "No Title",
                description:
                  post.post && post.post.post
                    ? post.post.post.content
                    : "No Content",
                username: post.user.username,
                community: post.community.name,
                upvotes: post.post.upvotes,
                downvotes: post.post.downvotes,
                postid: post.post.post.id,
              }}
              report={logged}
              postId={post.post.post.id}
              vote={logged}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
