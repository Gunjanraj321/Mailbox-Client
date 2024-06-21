import { io } from "socket.io-client";

let socket;

export const connectWebSocket = (url) => {
  if (!socket) {
    socket = io(url, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log(`connection to websocket server`);
    });
  }
  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not connected");
  }
  return socket;
};
