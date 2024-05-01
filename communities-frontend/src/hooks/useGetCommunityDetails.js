import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/Cookies/getToken.js";

function useGetCommunityDetails() {
  const [communityDetails, setCommunityDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // get the communityID from query
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        // get the token
        let { username, token } = getToken();
        const response_status = await axios.get(
          `http://localhost:8080/community/user/status/${id}/${username}`,
          {
            params: {
              token: token,
              username: username,
            },
          }
        );
        console.log(response_status.data);
        const response = await axios.get(
          `http://localhost:8080/community/${id}/details`
        );
        console.log(response.data);
        setCommunityDetails({
          details: response.data,
          status: response_status.data,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunityDetails();
  }, []);

  return { loading, communityDetails };
}

export { useGetCommunityDetails };
