import { Routes, Route } from 'react-router-dom';
import ProvidersPage from '../pages/ProvidersPage';
import ProviderDetail from '../pages/ProviderDetail';
import BookingsPage from '../pages/BookingsPage';
import ChatPage from '../pages/ChatPage';
import ProviderDashboard from '../pages/ProviderDashboard';
import ProtectedRoute from './ProtectedRoute';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProvidersPage />} />
          <Route path="/providers/:id" element={<ProviderDetail />} />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:receiverId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/provider"
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
