import { useEffect, useState } from "react";
import axios from "axios";

function useGetUserDetails() {
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
        const response = await axios.get("http://localhost:8080/user");
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);
}
