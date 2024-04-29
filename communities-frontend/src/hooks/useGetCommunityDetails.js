import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function useGetCommunityDetails() {
  const [communityDetails, setCommunityDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // get the communityID from query
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/community/${id}/details`
        );
        console.log(response.data);
        setCommunityDetails(response.data);
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
