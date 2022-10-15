const tokenName = 'token';


const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem(tokenName));
  return user?.accessToken;
};
const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem(tokenName));
  user.accessToken = token;
  localStorage.setItem(tokenName, JSON.stringify(user));
};
const getUser = () => {
  return JSON.parse(localStorage.getItem(tokenName));
};
const setUser = (user) => {
  localStorage.setItem(tokenName, JSON.stringify(user));
};
const removeUser = () => {
  localStorage.removeItem(tokenName);
};
const TokenService = {
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
export default TokenService;
