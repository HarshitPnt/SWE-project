import styles from "./UserProfile.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "../../hooks/useGetUserDetails.js";
import { useGetUserPosts } from "../../hooks/useGetUserPosts.js";

export function SingleUser(name, img) {
  return (
    <div className={styles.singleuserbx}>
      <img src={img} alt="user" className={styles.singleuserbximg} />
      <div className={styles.singleuserbxinfo}>
        <h4>{name}</h4>
      </div>
    </div>
  );
}

function UserProfile() {
  const [logged, setLogged] = useState(true);
  const { userDetails, own } = useGetUserDetails();
  const { posts } = useGetUserPosts();
  useEffect(() => {
    console.log(document.cookie);
    if (!document.cookie.includes("token")) {
      setLogged(false);
    }
  }, []);

  useEffect(() => {
    console.log(userDetails);
    // console.log(own);
  }, [userDetails]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className={styles.UserProfile}>
      <Header className={styles.navbar} loggedIn={logged} />
      <div className={styles.body}>
        <Sidebar className={styles.Sidebar} loggedIn={logged} />
        <div className={styles.box1}>
          <div className={styles.Header}>
            <img
              src={
                !userDetails.profile_picture
                  ? "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
                  : userDetails.profile_picture
              }
              alt="user"
              className={styles.HeaderImg}
            />
            <div className={styles.userText}>
              <h2>{userDetails.username}</h2>
              <h4>{userDetails.bio}</h4>
            </div>
            <div className={styles.headerbtns}>
              {!own && (
                <>
                  <button className={styles.headerbtn}>
                    <FontAwesomeIcon icon={faUserFriends} />
                  </button>
                  <button className={styles.headerbtn}>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={styles.PostArray}>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={{
                  title: post.post.post.title,
                  description: post.post.post.content,
                  username: post.user.username,
                  community: post.community.name,
                  upvotes: post.post.upvotes,
                  downvotes: post.post.downvotes,
                  type: post.post.post.type,
                  video: post.post.post.video,
                  image: post.post.post.image,
                  id: post.user.id,
                  postid: post.post.post.id,
                }}
              />
            ))}
            {/* <Post
              post={{
                title: "Title",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id sapien nec purus lacinia aliquet. Sed nec nunc id neque tincidunt accumsan",
                username: "John Doe",
              }}
            />
            <Post
              post={{
                title: "Title",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id sapien nec purus lacinia aliquet. Sed nec nunc id neque tincidunt accumsan",
                username: "John Doe",
              }}
            /> */}
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.rightheader}>
            <h2>Followers</h2>
          </div>
          <div className={styles.userList}>
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "This is a very big name",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
          </div>
        </div>
        <div className={styles.box3}>
          <div className={styles.rightheader}>
            <h2>Following</h2>
          </div>
          <div className={styles.userList}>
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
            {SingleUser(
              "John Doe",
              "https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
