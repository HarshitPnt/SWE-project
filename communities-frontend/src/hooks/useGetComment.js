import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/Cookies/getToken";
import { useParams } from "react-router-dom";

function useGetComment() {
  const params = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let { username, token } = getToken();
        const response = await axios.get(
          `http://localhost:8080/comment/${params.id}`,
          {
            params: {
              token: token,
              username: username,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, []);

  return { comments };
}

export { useGetComment };
