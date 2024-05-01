import React, { useEffect, useState } from "react";
import styles from "./CommentTree.module.css";
import { useGetComment } from "../../hooks/useGetComment";
import MarkdownRenderer from "../../utils/Markdown/RenderMarkdown";

// Define sample comment data
const comments = [
  { id: 1, text: "Comment 1", parentId: null },
  { id: 2, text: "Comment 1.1", parentId: 1 },
  { id: 3, text: "Comment 1.2", parentId: 1 },
  { id: 4, text: "Comment 1.2.1", parentId: 3 },
  { id: 5, text: "Comment 2", parentId: null },
  { id: 6, text: "Comment 2.1", parentId: 5 },
];

function Comment({ comment, comments, onReply }) {
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
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim() !== "") {
      onReply(comment.id, replyText);
      setReplyText("");
    }
  };

  const childComments = comments.filter((c) => c.parentId === comment.id);

  return (
    <div className={styles.comment}>
      <div className={styles.commentText}>
        <MarkdownRenderer markdownContent={renderLink(comment.text)} />
      </div>
      <div className={styles.replyForm}>
        <input
          type="text"
          placeholder="Reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleReply}>Reply</button>
      </div>
      {childComments.length > 0 && (
        <div className={styles.replies}>
          {childComments.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              comments={comments}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentTree() {
  const { comments } = useGetComment();
  const [commentTree, setCommentTree] = useState(comments);
  const [mainPostComment, setMainPostComment] = useState("");
  useEffect(() => {
    console.log(comments);
    setCommentTree(comments);
  }, [comments]);

  const handleReply = (parentId, replyText) => {
    const newComment = {
      id: commentTree.length + 1,
      text: replyText,
      parentId: parentId,
    };
    setCommentTree([...commentTree, newComment]);
  };

  const handleMainPostComment = () => {
    if (mainPostComment.trim() !== "") {
      const newComment = {
        id: commentTree.length + 1,
        text: mainPostComment,
        parentId: null,
      };
      setCommentTree([...commentTree, newComment]);
      setMainPostComment("");
    }
  };

  return (
    <div className={styles.commentTree}>
      <div className={styles.mainPostComment}>
        <input
          type="text"
          placeholder="Leave a comment..."
          value={mainPostComment}
          onChange={(e) => setMainPostComment(e.target.value)}
          className={styles.mainComment}
        />
        <button onClick={handleMainPostComment}>Comment</button>
      </div>
      <h2>Comment Tree</h2>
      {commentTree
        .filter((comment) => comment.parentId === "")
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            comments={commentTree}
            onReply={handleReply}
          />
        ))}
    </div>
  );
}

export default CommentTree;
