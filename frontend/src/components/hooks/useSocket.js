import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, disconnectWebSocket, getSocket } from "../Socket";

const useWebSocket = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.isToken);
  const userId = useSelector((state) => state.auth.isUserId);

  useEffect(() => {
    let socket;

    if (token) {
      socket = connectWebSocket("http://localhost:3001");
      socket.emit("register", userId);

      socket.on("disconnect", () => {
        console.log("Socket disconnected. Attempting to reconnect...");
        socket.connect();
      });
    }

    return () => {
      if (socket) {
        disconnectWebSocket();
      }
    };
  }, [token, userId, dispatch]);

  return getSocket;
};

export default useWebSocket;
