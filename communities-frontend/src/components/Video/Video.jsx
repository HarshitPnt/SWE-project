import React from "react";
import ReactPlayer from "react-player";
import styles from "./Video.module.css";

function Video({ video }) {
  return (
    <div className={styles.video}>
      <ReactPlayer url={video} controls width="100%" height="100%" />
    </div>
  );
}

export default Video;
