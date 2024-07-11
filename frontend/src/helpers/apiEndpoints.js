const isDevelopment = import.meta.env.MODE === "development";
const AUTH_URL = isDevelopment
  ? "http://localhost:3000/users/tokens"
  : import.meta.env.VITE_AUTH_API_BASE_URL;
const BASE_URL = isDevelopment
  ? "http://localhost:3000/api/v1"
  : import.meta.env.VITE_API_BASE_URL;

const authEndPoints = {
  signUp: `${AUTH_URL}/sign_up`,
  signIn: `${AUTH_URL}/sign_in`,
  revoke: `${AUTH_URL}/revoke`,
};
const endpoints = {
  users: `${BASE_URL}/users`,
  chatRooms: `${BASE_URL}/chat_rooms`,
  messages: `${BASE_URL}/messages`,
};

const webSocketURL = isDevelopment
  ? "ws://localhost:3000/cable"
  : import.meta.env.VITE_WEBSOCKET_URL;

export { authEndPoints, endpoints, webSocketURL };
