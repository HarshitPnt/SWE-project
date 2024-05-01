import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/Cookies/getToken";
import { useParams } from "react-router-dom";

function useGetUserPosts() {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userID = params.id;
        let { username, token } = getToken();
        const post = [];
        await axios
          .get(`http://localhost:8080/post/creator/${userID}`, {
            params: {
              token: token,
              username: username,
            },
          })
          .then(async (res) => {
            // for each post get user details of creator_id
            for (const response of res.data) {
              const resp = await axios.get(
                `http://localhost:8080/user/${response.creator_id}`,
                {
                  params: {
                    token: token,
                    username: username,
                  },
                }
              );
              // also get the details of the post
              const resp_post = await axios.get(
                `http://localhost:8080/post/${response.id}`,
                {
                  params: {
                    token: token,
                    username: username,
                  },
                }
              );
              // get community details
              const resp_community = await axios.get(
                `http://localhost:8080/community/${response.community_id}`,
                {
                  params: {
                    token: token,
                    username: username,
                  },
                }
              );
              // add all the details to the post object
              post.push({
                post: resp_post.data,
                user: resp.data,
                community: resp_community.data,
              });
            }
          });
        setPosts(post);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserPosts();
  }, []);
  return { posts };
}

export { useGetUserPosts };
