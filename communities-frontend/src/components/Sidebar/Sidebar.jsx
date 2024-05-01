import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { storage } from "../../utils/Firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { getToken } from "../../utils/Cookies/getToken";

const CreateCommunity = ({ isOpen, onClose }) => {
  const uploadImage = async () => {
    if (img == null) {
      return;
    }
    const imageName = `communityBanners/${img.name + v4()}`;
    const imageRef = ref(storage, `${imageName}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      getDownloadURL(imageRef)
        .then((url) => {
          console.log("File available at", url);
        })
        .catch((error) => {
          console.error("Error getting download URL", error);
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    });
  };

  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("success");
  const [img, setImg] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", text);
    formData.append("description", text);
    if (error == "success") {
      await uploadImage();

      // setError("");
    }
  };
  const descRef = useRef();
  const [visibility, setVisibility] = useState("public");
  const handleOptionChange = (e) => {
    setVisibility(e.target.value);
  };

  const [postPrivilege, setPostPrivilege] = useState("no-post");
  const [commentPrivilege, setCommentPrivilege] = useState("no-comment");

  const handlePostPrivilege = (e) => {
    if (postPrivilege == "no-post") setPostPrivilege("post");
    else setPostPrivilege("no-post");
    console.log(postPrivilege);
  };

  const handleCommentPrivilege = (e) => {
    if (commentPrivilege == "no-comment") setCommentPrivilege("comment");
    else setCommentPrivilege("no-comment");
  };

  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div className={styles.popup}>
        <h2>Create Community</h2>
        <label className={styles.label_css} htmlFor="">
          Community Name
        </label>
        <input type="text" placeholder="Name" />
        <label className={styles.label_css} htmlFor="">
          Description
        </label>
        <textarea name="Description" placeholder="Description"></textarea>
        <label
          className={styles.label_css}
          htmlFor=""
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        >
          Community Profle Picture
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder="Media URL"
          ref={descRef}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <div className={styles.create_comm_footer}>
          <div className={styles.comm_options_wrapper}>
            <div>
              <h4 className={styles.comm_heading}>Select visibility</h4>
              <div className={styles.visibility}>
                <div className={styles.radio}>
                  <label htmlFor="public">
                    <p>Public</p>{" "}
                    <input
                      type="radio"
                      value="public"
                      checked={visibility === "public"}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
                <div className={styles.radio}>
                  <label htmlFor="invite">
                    <p>Invite</p>{" "}
                    <input
                      type="radio"
                      value="invite"
                      checked={visibility === "invite"}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
                <div className={styles.radio}>
                  <label htmlFor="request">
                    <p>Request</p>
                    <input
                      type="radio"
                      value="request"
                      checked={visibility === "request"}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h4 className={styles.comm_heading}>Select Privileges</h4>
              <div className={styles.visibility}>
                <div className={styles.radio}>
                  <label htmlFor="Post">
                    <p>Post</p>
                    <input
                      type="checkbox"
                      value="Post"
                      onClick={handlePostPrivilege}
                    />
                  </label>
                </div>
                <div className={styles.radio}>
                  <label htmlFor="Comment">
                    <p>Comment</p>
                    <input
                      type="checkbox"
                      value="Comment"
                      onClick={handleCommentPrivilege}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.submitBtns}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}> Close</button>
          </div>
        </div>

        {error === "error" && (
          <p className={styles.error}>Community with same name exists</p>
        )}
        {error === "success" && (
          <p className={styles.success}>Successfully created community</p>
        )}
      </div>
    </Modal>
  );
};

function Sidebar({ page = 0, loggedIn }) {
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

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!loggedIn) return;
      //get token
      let { username, token } = getToken();
      if (token === undefined || username === undefined) {
        return;
      }
      // get all joined communities
      const res = await axios.get(
        `http://localhost:8080/community/list/joined`,
        {
          params: {
            token: token,
            username: username,
          },
        }
      );
      const res_mod = await axios.get(
        `http://localhost:8080/community/list/moderator`,
        {
          params: {
            token: token,
            username: username,
          },
        }
      );
      const res_admin = await axios.get(
        `http://localhost:8080/community/list/admin`,
        {
          params: {
            token: token,
            username: username,
          },
        }
      );
    };
    fetchCommunities();
  }, []);

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
        {loggedIn && (
          <>
            <button className={homebutton_class} onClick={handlehomeclick}>
              <FontAwesomeIcon icon={faHome} className={styles.sidebar_img} />
              Home
            </button>{" "}
          </>
        )}

        <button className={trendingbutton_class} onClick={handleTrendingClick}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className={styles.sidebar_img}
          />
          Trending
        </button>
        {loggedIn && (
          <>
            <button className={styles.sidebar_btn} onClick={handleCreateComm}>
              <FontAwesomeIcon icon={faPlus} className={styles.sidebar_img} />
              New Community
            </button>
          </>
        )}
        <CreateCommunity isOpen={showModal} onClose={handleCloseModal} />
        {loggedIn && (
          <>
            <hr className={styles.hr_sidebar} />
            {/* Dropdown named communities */}
            <div className={styles.dropdown}>
              <button
                className={styles.dropbtn}
                onClick={handleJoinedCommunities}
              >
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
              <button
                className={styles.dropbtn}
                onClick={handleAdminCommunities}
              >
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
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
