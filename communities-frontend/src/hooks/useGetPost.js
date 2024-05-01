import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/Cookies/getToken";
import { useParams } from "react-router-dom";

function useGetPost() {
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let { username, token } = getToken();
        const response = await axios.get(
          `http://localhost:8080/post/${params.id}`,
          {
            params: {
              token: token,
              username: username,
            },
          }
        );
        // get user details of creator_id
        const resp = await axios.get(
          `http://localhost:8080/user/${response.data.post.creator_id}`,
          {
            params: {
              token: token,
              username: username,
            },
          }
        );
        // get community details
        const resp_community = await axios.get(
          `http://localhost:8080/community/${response.data.post.community_id}`,
          {
            params: {
              token: token,
              username: username,
            },
          }
        );
        // add all the details to the post object
        setPost({
          post: response.data,
          user: resp.data,
          community: resp_community.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, []);
  return { post };
}

export { useGetPost };
