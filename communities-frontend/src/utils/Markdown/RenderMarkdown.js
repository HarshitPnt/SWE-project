import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { parseMarkdown } from "./ParserMarkdown";
import breaks from "remark-breaks";

function MarkdownRenderer({ markdownContent }) {
  useEffect(() => {
    console.log(markdownContent);
  }, [markdownContent]);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
