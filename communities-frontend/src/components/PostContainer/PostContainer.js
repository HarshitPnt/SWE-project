import styles from "./PostContianer.module.css";

// type can be one of: trending, home, community, user,
function PostContainer({ posts, type }) {
  return <div className={styles.PostContainer}>{children}</div>;
}
