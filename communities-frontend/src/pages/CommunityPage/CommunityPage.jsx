import styles from "./CommunityPage.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useState } from "react";

const WritePost = ({ isOpen, onClose }) => {
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
          Media URL
        </label>
        <input type="text" placeholder="Media URL" />

        <button onClick={onClose}>Submit</button>
      </div>
    </Modal>
  );
};

function CommunityPage() {
  const [showModal, setShowModal] = useState(false);
  const handlePost = async () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.CommunityPage}>
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
              <h2>Programming</h2>
              <h4>Learn how to program</h4>
            </div>
            <div className={styles.headerbtns}>
              <button className={styles.headerbtn} onClick={handlePost}>
                Post
              </button>
              <WritePost isOpen={showModal} onClose={handleCloseModal} />
            </div>
          </div>
          <div className={styles.PostArray}>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
