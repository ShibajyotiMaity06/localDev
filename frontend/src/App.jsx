import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SkillExchange from "./pages/SkillExchange.jsx";
import ProviderDetails from "./pages/ProviderDetail.jsx";
import BookingPage from "./pages/BookingsPage.jsx";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import { toast, Toaster } from "react-hot-toast";
import BrowseProviders from "./pages/BrowseProviders.jsx";

const NotificationHandler = () => {
  const { socket } = useAuth();

  useEffect(() => {
    if (!socket) return;
    socket.on("notification", ({ message }) => toast.success(message));
    return () => socket.off("notification");
  }, [socket]);

  return <Toaster position="top-right" reverseOrder={false} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NotificationHandler />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<BrowseProviders />} />
          <Route path="/skill-exchange" element={<SkillExchange />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/dashboard" element={<ProviderDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
