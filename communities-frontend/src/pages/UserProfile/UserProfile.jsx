import styles from "./UserProfile.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export function SingleUser(name, img) {
  return (
    <div className={styles.singleuserbx}>
      <img src={img} alt="user" className={styles.singleuserbximg} />
      <div className={styles.singleuserbxinfo}>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className={styles.UserProfile}>
      <Header className={styles.navbar} />
      <div className={styles.body}>
        <Sidebar className={styles.Sidebar} />
        <div className={styles.box1}>
          <div className={styles.Header}>
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
              alt="user"
              className={styles.HeaderImg}
            />
            <div className={styles.userText}>
              <h2>John Doe</h2>
              <h4>I am so sexy</h4>
            </div>
            <div className={styles.headerbtns}>
              <button className={styles.headerbtn}>
                <FontAwesomeIcon icon={faUserFriends} />
              </button>
              <button className={styles.headerbtn}>
                <FontAwesomeIcon icon={faMessage} />
              </button>
            </div>
          </div>
          <div className={styles.PostArray}>
            <Post />
            <Post />
            <Post />
            <Post />
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
