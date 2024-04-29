import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const CreateCommunity = ({ isOpen, onClose }) => {
  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.popup}>
        <h2>Create Post</h2>
        <label className={styles.label_css} htmlFor="">
          Title
        </label>
        <input type="text" placeholder="Title" />
        <label className={styles.label_css} htmlFor="">
          Description
        </label>
        <textarea placeholder="Description" />
        <label className={styles.label_css} htmlFor="">
          Community Profle Picture
        </label>
        <input type="text" placeholder="Media URL" />

        <button onClick={onClose}>Submit</button>
      </div>
    </Modal>
  );
};

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

  // const handlecommunityclick = () => {
  //   window.location.href = "/community";
  // };

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

  const [showModal, setShowModal] = useState(false);

  const handleCreateComm = async () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        <button className={styles.sidebar_btn} onClick={handleCreateComm}>
          <FontAwesomeIcon icon={faPlus} className={styles.sidebar_img} />
          New Community
        </button>
        <CreateCommunity isOpen={showModal} onClose={handleCloseModal} />
        <hr className={styles.hr_sidebar} />
        {/* Dropdown named communities */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={handleJoinedCommunities}>
            Joined Communities
          </button>
          <div className={JoinedCommunitiesClass}>
            <a href="/community/1"> SquaredCircle</a>
            <a href="/community/8"> randomacts</a>
            <a href="/community/10"> socialskills</a>
          </div>
        </div>
        <hr className={styles.hr_sidebar} />

        {/* Dropdown for communities as admin */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={handleAdminCommunities}>
            Admin Communities
          </button>
          <div className={AdminCommunitiesClass}>
            <a href="/community/1"> SquaredCircle</a>
            <a href="/community/8"> randomacts</a>
            <a href="/community/10"> socialskills</a>
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
            <a href="/community/1"> SquaredCircle</a>
            <a href="/community/8"> randomacts</a>
            <a href="/community/10"> socialskills</a>
          </div>
        </div>
        <hr className={styles.hr_sidebar} />
      </div>
    </>
  );
}

export default Sidebar;
