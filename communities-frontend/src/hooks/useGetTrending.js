import { useState, useEffect } from "react";
import axios from "axios";

function useGetTrending() {
  const [trending, setTrending] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let users = {};
    const fetchTrending = async () => {
      try {
        const posts = [];
        await axios.get("http://localhost:8080/trending").then(async (res) => {
          // get the post details
          for (const post of res.data) {
            const resp_post = await axios.get(
              `http://localhost:8080/user/${post.post.creator_id}`
            );

            // get community details
            const resp_community = await axios.get(
              `http://localhost:8080/community/${post.post.community_id}`
            );

            // add all the details to the post object
            posts.push({
              post: post,
              user: resp_post.data,
              community: resp_community.data,
            });
          }
        });
        setTrending(posts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrending();
  }, []);

  return { loading, trending, userDetails };
}

export { useGetTrending };
