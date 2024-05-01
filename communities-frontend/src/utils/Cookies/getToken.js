export const getToken = () => {
  // Cookie is of format username:username; token:token
  const cookie = document.cookie;
  const cookieArray = cookie.split(";");
  console.log(cookieArray.length);
  if (cookieArray.length < 2) {
    return { undefined, undefined };
  }
  let username = "";
  let token = "";
  for (let i = 0; i < cookieArray.length; i++) {
    if (i == 0) {
      token = cookieArray[i].split("=")[1].trim();
      // console.log(username);
    }
    if (i == 1) {
      username = cookieArray[i].split("=")[1].trim();
    }
  }
  return { username, token };
};
