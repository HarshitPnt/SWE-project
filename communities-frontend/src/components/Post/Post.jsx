import styles from "./Post.module.css";
import Poll from "../Poll/Poll";
import ReactPlayer from "react-player";
import Video from "../Video/Video";
import Image from "../Image/Image";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faSave,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import MarkdownRenderer from "../../utils/Markdown/RenderMarkdown";

const Report = ({ isOpen, onClose, postTitle }) => {
  return (
    <Modal className={styles.wrapper} isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <h2>Report {postTitle}</h2>
        <form action="sumbit">
          <input
            type="text"
            placeholder="Enter the reason"
            className={styles.report}
          />
        </form>
        <button className={styles.button}>Submit</button>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

function Post({
  post,
  type,
  video,
  image,
  poll_question,
  poll_end_date,
  poll_options,
  poll_result,
  join,
  report,
  save,
  vote,
}) {
  // required fileds in a post:
  // post.title
  // post.description
  // post.community
  // post.username
  // post.votes
  // post.comments
  // user.profile_picture
  // user.is_member

  const [isOpen, setIsOpen] = useState(false);
  const [upvotes, setupvotes] = useState(post.upvotes ? post.upvotes : 0);
  const [downvotes, setdownvotes] = useState(
    post.downvotes ? post.downvotes : 0
  );
  const [id, setID] = useState(1);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (post.user) setID(post.user.id);
    console.log(post.user);
  }, [post]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const renderLink = (content) => {
    // whenever you get a [Link]url replace this with [url](url), the url may be of the form [Link](url) too
    // link is after [Link] till the end of the next word

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

  const [showModal, setShowModal] = useState(false);

  const handleReport = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpvote = () => {
    if (vote) setupvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    if (vote) setdownvotes(downvotes + 1);
  };

  return (
    <div className={styles.Post}>
      <div className={styles.post_header}>
        <div className={styles.post_header_left}>
          <Link to={post.id ? `/user/${post.id}` : "/user/1"}>
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png"
              alt="user"
              className={styles.post_header_img}
            />
          </Link>
          <div className={styles.post_header_info}>
            <span className={styles.post_header_info_name}>
              {post.community === undefined ? "" : post.community}
            </span>
            <span className={styles.post_header_info_time}>
              Posted by {post.username === undefined ? "" : post.username}
            </span>
          </div>
        </div>
        <div className={styles.Join_header}>
          {join && <button className={styles.Join}>Join</button>}
        </div>
      </div>
      <hr />
      <div className={styles.post_body}>
        <div className={styles.post_body_title}>{post.title}</div>
        <div className={styles.post_body_text}>
          {/* {post.description === undefined ? "" : post.description} */}
          <MarkdownRenderer markdownContent={renderLink(post.description)} />
        </div>
      </div>
      {type == "video" && <Video video={video} />}
      {type == "image" && (
        <img
          src={image}
          alt="image"
          className={styles.popupimage}
          onClick={togglePopup}
        />
      )}
      {isOpen && type == "image" && (
        <>
          <div
            className={`${styles.popupcontainer} ${isOpen ? styles.open : ""}`}
            onClick={togglePopup}
          >
            <div className={styles.popup}>
              <img
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                alt="image"
                className={styles.image}
              />
            </div>
          </div>
        </>
      )}
      {type == "poll" && <Poll className={styles.poll} />}
      <hr />
      <hr />
      <div className={styles.post_footer}>
        <div className={styles.post_footer_left}>
          <button
            className={styles.post_footer_left_btn}
            onClick={handleUpvote}
          >
            <span>{upvotes ? upvotes : 0} </span>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className={styles.post_footer_left_btn}
            onClick={handleDownvote}
          >
            <span>{downvotes ? downvotes : 0}</span>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className={styles.post_footer_right}>
          {report && (
            <button className={styles.post_footer_right_btn}>
              <FontAwesomeIcon icon={faFlag} onClick={handleReport} />
              <Report
                isOpen={showModal}
                onClose={handleCloseModal}
                postTitle={"Report this post"}
              />
            </button>
          )}
          <Link to={`/post/${post.postid}`}>
            <button className={styles.post_footer_right_btn}>
              <FontAwesomeIcon icon={faComment} />
            </button>
          </Link>
          {save && (
            <button className={styles.post_footer_right_btn}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
