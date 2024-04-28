import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPoop, faAnchor } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Sidebar() {
  const [JoinedCommunities, setJoinedCommunities] = useState(true);
  const [AdminCommunities, setAdminCommunities] = useState(false);
  const [ModeratorCommunities, setModeratorCommunities] = useState(false);
  const handleJoinedCommunities = () => {
    setJoinedCommunities(!JoinedCommunities);
  };
  const handleAdminCommunities = () => {
    setAdminCommunities(!AdminCommunities);
  };
  const handleModeratorCommunities = () => {
    setModeratorCommunities(!ModeratorCommunities);
  };

  const JoinedCommunitiesClass = JoinedCommunities
    ? styles.dropdown_content
    : styles.hide;
  const AdminCommunitiesClass = AdminCommunities
    ? styles.dropdown_content
    : styles.hide;
  const ModeratorCommunitiesClass = ModeratorCommunities
    ? styles.dropdown_content
    : styles.hide;

  return (
    <>
      <div className={styles.Sidebar}>
        {/* Buttons for home trending and All*/}
        <button className={styles.sidebar_btn}>
          <FontAwesomeIcon icon={faHome} className={styles.sidebar_img} />
          Home
        </button>
        <button className={styles.sidebar_btn}>
          <FontAwesomeIcon icon={faPoop} className={styles.sidebar_img} />
          Trending
        </button>
        <button className={styles.sidebar_btn}>
          <FontAwesomeIcon icon={faAnchor} className={styles.sidebar_img} />
          All
        </button>
        <hr className={styles.hr_sidebar} />
        {/* Dropdown named communities */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={handleJoinedCommunities}>
            Joined Communities
          </button>
          <div className={JoinedCommunitiesClass}>
            <a href="/">c/programming</a>
            <a href="/">c/AskReddit</a>
            <a href="/">c/learnprogramming</a>
          </div>
        </div>
        <hr className={styles.hr_sidebar} />

        {/* Dropdown for communities as admin */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={handleAdminCommunities}>
            Admin Communities
          </button>
          <div className={AdminCommunitiesClass}>
            <a href="/">c/programming</a>
            <a href="/">c/AskReddit</a>
            <a href="/">c/learnprogramming</a>
          </div>
        </div>
        <hr className={styles.hr_sidebar} />

        {/* Dropdown for communities as moderator */}

        <div className={styles.dropdown}>
          <button
            className={styles.dropbtn}
            onClick={handleModeratorCommunities}
          >
            Moderator communities
          </button>
          <div className={ModeratorCommunitiesClass}>
            <a href="/">c/programming</a>
            <a href="/">c/AskReddit</a>
            <a href="/">c/learnprogrammingrightnow</a>
          </div>
        </div>
        <hr className={styles.hr_sidebar} />
      </div>
    </>
  );
}

export default Sidebar;
