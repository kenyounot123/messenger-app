const AUTH_URL =
  import.meta.env.AUTH_API_BASE_URL || "http://localhost:3000/users/tokens";
const BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000/api/v1";

const authEndPoints = {
  signUp: `${AUTH_URL}/sign_up`,
  signIn: `${AUTH_URL}/sign_in`,
};
const endpoints = {
  getUsers: `${BASE_URL}/users`,
};

export { authEndPoints, endpoints };
