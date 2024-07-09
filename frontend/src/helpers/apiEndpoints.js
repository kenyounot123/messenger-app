const AUTH_URL =
  import.meta.env.VITE_AUTH_API_BASE_URL ||
  "http://localhost:3000/users/tokens";
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

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

const webSocketURL =
  import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:3000/cable";

export { authEndPoints, endpoints, webSocketURL };
