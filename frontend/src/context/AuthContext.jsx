import { createContext, useContext, useEffect, useState } from "react";
import { VerifyToken } from "../services/authService.js";
import io from "socket.io-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      VerifyToken(token)
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  // initialize socket once user is known
  useEffect(() => {
    if (user?._id) {
      const s = io(import.meta.env.VITE_BACKEND_URL);
      s.emit("join", user._id);
      setSocket(s);

      s.on("notification", (payload) => {
        console.log("🔔 Notification:", payload.message);
        // optional: integrate toast or alert UI here
      });

      return () => s.disconnect();
    }
  }, [user]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    socket?.disconnect();
    setSocket(null);
  };

  return (
    <AuthContext.Provider value={{ user, socket, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
