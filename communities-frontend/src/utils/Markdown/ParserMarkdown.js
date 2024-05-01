function parseMarkdown(text) {
  // entire word followd by [Link] is a link so parse into <a> tag
  const link = /\b\w+\b\[Link\]/g;
  text = text.replace(link, (match) => {
    return `<a href="/${match}">${match}</a>`;
  });
}

export { parseMarkdown };
