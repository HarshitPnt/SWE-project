import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ page = 0 }) {
  const [JoinedCommunities, setJoinedCommunities] = useState(true);
  const [AdminCommunities, setAdminCommunities] = useState(false);
  const [ModeratorCommunities, setModeratorCommunities] = useState(false);
  const xyz = "communityName";
  const handleJoinedCommunities = () => {
    setJoinedCommunities(!JoinedCommunities);
  };
  const handleAdminCommunities = () => {
    setAdminCommunities(!AdminCommunities);
  };
  const handleModeratorCommunities = () => {
    setModeratorCommunities(!ModeratorCommunities);
  };

  const handlehomeclick = () => {
    if (page !== 2) {
      window.location.href = "/home";
    }
  };

  const handleTrendingClick = () => {
    if (page !== 1) {
      window.location.href = "/";
    }
  };

  const handlecommunityclick = () => {
    window.location.href = "/community";
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

  const homebutton_class = page === 2 ? styles.active : styles.sidebar_btn;
  const trendingbutton_class = page === 1 ? styles.active : styles.sidebar_btn;

  return (
    <>
      <div className={styles.Sidebar}>
        {/* Buttons for home trending and All*/}

        <button className={homebutton_class} onClick={handlehomeclick}>
          <FontAwesomeIcon icon={faHome} className={styles.sidebar_img} />
          Home
        </button>
        <button className={trendingbutton_class} onClick={handleTrendingClick}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className={styles.sidebar_img}
          />
          Trending
        </button>
        <button className={styles.sidebar_btn}>
          <FontAwesomeIcon icon={faPlus} className={styles.sidebar_img} />
          New Community
        </button>
        <hr className={styles.hr_sidebar} />
        {/* Dropdown named communities */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={handleJoinedCommunities}>
            Joined Communities
          </button>
          <div className={JoinedCommunitiesClass}>
            <a onClick={handlecommunityclick}>c/programming</a>
            <a>c/AskReddit</a>
            <a>c/learnprogramming</a>
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
