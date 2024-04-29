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
        let response = await axios.get("http://localhost:8080/trending");
        console.log(response);
        // for each post in response get userdeatils of creator_id
        response.data.forEach(async (res) => {
          const resp = await axios.get(
            `http://localhost:8080/user/${res.creator_id}`
          );
          // add res.creator_id to users object
          users[res.creator_id] = resp.data;
        });
        setTrending(response.data);
        setUserDetails(users);
        // console.log(userDetails);
        console.log(trending);
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
