import styles from "./CommunityPage.module.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useGetCommunityPosts } from "../../hooks/useGetCommunityPosts.js";
import { useGetCommunityDetails } from "../../hooks/useGetCommunityDetails.js";
import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "../../utils/Markdown/RenderMarkdown";
import PollCreation from "../../components/CreatePoll/PollCreation.jsx";

import { storage } from "../../utils/Firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import Spinner from "../../components/Spinner/Spinner";

const CreatePoll = ({ isOpen, onClose }) => {
  const [options, setOptions] = useState(["", ""]); // Initial state with two empty options

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]); // Add an empty option to the options array
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1); // Remove the option at the specified index
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the poll options
    console.log(
      "Submitted options:",
      options.filter((option) => option.trim() !== "")
    );
  };
  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <h2>Create a Poll</h2>
        <form onSubmit={handleSubmit}>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(index, event)}
                placeholder={`Option ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
          <button type="submit">Create Poll</button>
        </form>
      </div>
    </Modal>
  );
};

const WritePost = ({ isOpen, onClose, img_option, video_option }) => {
  const [spinnerState, setSpinnerState] = useState(false);
  const [media, setMedia] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgError, setImgError] = useState("");

  const uploadVideo = async () => {
    if (media == null) {
      return;
    }
    // check if video is greater than 50MB
    if (media.size > 50 * 1024 * 1024) {
      console.error("Video size is greater than 50MB");
      return;
    }
    const videoName = `posts/videos/${media.name + v4()}`;
    const videoRef = ref(storage, `${videoName}`);
    uploadBytes(videoRef, media).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      getDownloadURL(videoRef)
        .then((url) => {
          console.log("File available at", url);
          setSpinnerState(false);
        })
        .catch((error) => {
          console.error("Error getting download URL", error);
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    });
  };

  const uploadImage = async () => {
    if (media == null) {
      return;
    }
    // check if image is greater than 5MB
    if (media.size > 5 * 1024 * 1024) {
      console.error("Image size is greater than 5MB");
      setImgError("Image size is greater than 5MB");
      return;
    }
    const imageName = `posts/images/${media.name + v4()}`;
    const imageRef = ref(storage, `${imageName}`);
    uploadBytes(imageRef, media).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      getDownloadURL(imageRef)
        .then((url) => {
          console.log("File available at", url);
          setSpinnerState(false);
        })
        .catch((error) => {
          console.error("Error getting download URL", error);
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    });
  };

  const handleSubmit = async () => {
    // check if media
    console.log(media);
    console.log(spinnerState);
    if (media) {
      if (media.type.includes("image")) {
        await uploadImage();
      } else if (media.type.includes("video")) {
        await uploadVideo();
      }
    }
    setSpinnerState(true);
  };

  const mediaRef = useRef();
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
          Video/Image
        </label>
        <input
          type="file"
          accept="image/*, video/*"
          ref={mediaRef}
          onChange={(e) => {
            setMedia(e.target.files[0]);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
        <div className={styles.spinner}></div>
        {spinnerState && <Spinner />}
      </div>
    </Modal>
  );
};

function CommunityPage() {
  const renderLink = (content) => {
    // whenever you get a [Link]url replace this with [url](url), the url may be of the form [Link](url) too
    // link is after [Link] till the end of the next word
    if (!content) return "";
    const link = /\[Link\]\S+\b/g;
    let parseContent = content.replace(link, (match) => {
      return `[${match.substring(6)}](${match.substring(6)})`;
    });

    // there might be a \n in the text i need this to be replaced with an <br>
    parseContent = parseContent.replace(/\\n/g, "\n");

    // there might be a link without [Link] so we need to parse that as well
    // get word starting with http:// or https:// till the end of the word, there might be a \nbefore https://
    const linkHTTPS = /https?:\/\/\S+\b/g;

    return parseContent.replace(linkHTTPS, (match) => {
      return `[${match}](${match})`;
    });
  };
  const [logged, setLogged] = useState(true);
  const { loading, communityPosts } = useGetCommunityPosts();
  const { loading2, communityDetails } = useGetCommunityDetails();
  useEffect(() => {
    console.log(document.cookie);
    if (!document.cookie.includes("token")) {
      setLogged(false);
    }
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);

  const handlePost = async () => {
    setShowModal(true);
  };

  const handlePoll = async () => {
    setPollModal(true);
  };

  const handleClosePollModal = async () => {
    setPollModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("Logging communityz posts: ", communityPosts);
  }, [communityPosts]);

  useEffect(() => {
    // console.log("Logging community posts: ", communityDetails);
  }, [communityDetails]);

  return (
    <div className={styles.CommunityPage}>
      <Header className={styles.navbar} loggedIn={logged} />
      <div className={styles.body}>
        <Sidebar page={0} className={styles.Sidebar} loggedIn={logged} />
        <div className={styles.box1}>
          <div className={styles.Header}>
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
              alt="user"
              className={styles.HeaderImg}
            />
            <div className={styles.userText}>
              <h2>
                {communityDetails.details
                  ? communityDetails.details.name
                    ? communityDetails.details.name
                    : ""
                  : ""}
              </h2>
              <h4>
                <MarkdownRenderer
                  markdownContent={renderLink(
                    communityDetails.details
                      ? communityDetails.details.description
                        ? communityDetails.details.description
                        : ""
                      : ""
                  )}
                />
              </h4>
            </div>
            <div className={styles.headerbtns}>
              {communityDetails.status &&
                communityDetails.status.status === "not-in-community" &&
                communityDetails.status.type === "public" && (
                  <button className={styles.headerbtn}>Join</button>
                )}
              {communityDetails.status &&
                communityDetails.status.status === "not-in-community" &&
                communityDetails.status.type === "request" && (
                  <button className={styles.headerbtn}>Request</button>
                )}
              {communityDetails.status &&
                communityDetails.status.status === "active" &&
                communityDetails.status.privileges[0] == 1 && (
                  <>
                    <button className={styles.headerbtn} onClick={handlePost}>
                      Post
                    </button>
                    <button className={styles.headerbtn} onClick={handlePoll}>
                      Poll
                    </button>
                  </>
                )}
              <WritePost isOpen={showModal} onClose={handleCloseModal} />
              <PollCreation isOpen={pollModal} onClose={handleClosePollModal} />
            </div>
          </div>
          {communityDetails.status &&
            (communityDetails.status.status === "active" ||
              communityDetails.status.type === "public") && (
              <>
                <div className={styles.PostArray}>
                  {communityPosts.map((post) => (
                    <Post
                      key={post.id}
                      post={{
                        title: post.post.title,
                        description: post.post.content,
                        username: post.user.username,
                        community: post.community.name,
                        upvotes: post.upvotes,
                        downvotes: post.downvotes,
                        join: false,
                        id: post.user.id,
                      }}
                      report={logged}
                      save={logged}
                    />
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
