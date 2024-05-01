import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function useGetCommunityPosts() {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get the communityID from query
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/post/community/${id}/all`
        );
        setCommunityPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunityPosts();
  }, []);

  return { loading, communityPosts };
}

export { useGetCommunityPosts };
