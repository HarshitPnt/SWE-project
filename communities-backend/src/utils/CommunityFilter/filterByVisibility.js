import * as UserDB from "../../controllers/db/user.js";
import * as CommunityDB from "../../controllers/db/community.js";

export const getPublicCommunities = async (communities) => {
  const publicCommunities = communities.filter((community) => {
    return community.visibility === "public" && community.status === "active";
  });
  return publicCommunities;
};
// (TODO: implement membership function)
export const getMemberCommunities = async (communities, username) => {
  //   const user = await UserDB.getUserByUsername(username);
  //   const user_id = user.id;
  //   const memberships = await CommunityDB.getMembershipsByUserID(user_id);
  //   const memberCommunities = communities.filter((community) => {
  //     if (community.visibility === "public" && community.status === "active")
  //       return true;
  //     if (memberships[community.id]) return true;
  //     return false;
  //   });
  //   return memberCommunities;
  const publicCommunities = communities.filter((community) => {
    return community.visibility === "public" && community.status === "active";
  });
  return publicCommunities;
};
