import styles from "./SinglePost.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import CommentTree from "../../components/CommentTree/CommentTree";
import { useEffect, useState } from "react";
import { useGetPost } from "../../hooks/useGetPost";

function SinglePost() {
  const [logged, setLogged] = useState(true);
  const { post } = useGetPost();

  useEffect(() => {
    console.log(post);
  }, [post]);

  useEffect(() => {
    console.log(document.cookie);
    if (!document.cookie.includes("token")) {
      setLogged(false);
    }
  }, []);
  return (
    <div className={styles.SinglePost}>
      <Header className={styles.navbar} loggedIn={logged} />
      <div className={styles.body}>
        <Sidebar className={styles.Sidebar} loggedIn={logged} />
        <div className={styles.content}>
          <Post
            post={{
              title:
                post.post && post.post.post && post.post.post.title
                  ? post.post.post.title
                  : "No Title",
              description:
                post.post && post.post.post && post.post.post.content
                  ? post.post.post.content
                  : "",
              upvotes:
                post.post && post.post.post && post.post.upvotes
                  ? post.post.upvotes
                  : 0,
              downvotes:
                post.post && post.post.post && post.post.downvotes
                  ? post.post.downvotes
                  : 0,
              username:
                post.post && post.post.post && post.user.username
                  ? post.user.username
                  : "No Username",
              community:
                post.post && post.post.post && post.community.name
                  ? post.community.name
                  : "No Community",
              postid: post.post.post.id,
            }}
            report={logged}
            vote={logged}
            id={post.user.id}
          />
          <CommentTree />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
