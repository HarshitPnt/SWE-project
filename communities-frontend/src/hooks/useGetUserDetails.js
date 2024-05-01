import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../utils/Cookies/getToken";

function useGetUserDetails() {
  const params = useParams();
  const [own, setOwn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    email: "",
    profile_picture: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userID = params.id;
        let { username, token } = getToken();

        if (token === undefined || username === undefined) {
          const response = await axios.get(
            `http://localhost:8080/user/public/${userID}`
          );
          setUserDetails(response.data);
        } else {
          // verify token
          const response = await axios.get(
            `http://localhost:8080/verifyToken`,
            {
              params: {
                token: token,
                username: username,
              },
            }
          );
          console.log(response.data.id, userID);
          if (response.data.msg === "Token verified") {
            // get user details
            const resp = await axios.get(
              `http://localhost:8080/user/private/${userID}`
            );
            setUserDetails(resp.data);
            if (response.data.id == userID) {
              setOwn(true);
            }
          } else {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);
  return { userDetails, own };
}

export { useGetUserDetails };
