import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SkillExchange from "./pages/SkillExchange.jsx";
import LocalServices from "./pages/LocalServices.jsx"
import ProviderProfile from "./pages/ProviderProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skill-exchange" element={<SkillExchange />} />
          <Route path="/services" element={<LocalServices />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
