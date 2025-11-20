import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Stylists from "./pages/Stylists";
import AuthProvider from "./context/AuthContext.jsx";
import GlassmorphicSection from "./components/GlassmorphicSection";
import ChatWidget from "./components/ChatWidget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";


function AppInner() {
  return (
    <>
      {/* Navbar is fixed (h-16), so we need top padding to avoid overlap */}
      <Navbar /> 

      <div className="pt-16 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <GlassmorphicSection />
              </>
            }
          />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile" element={
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        } />
        </Routes>
      </div>

      {/* Footer - appears on all pages */}
      <Footer />

      {/* Chat Widget - appears on all pages */}
      <ChatWidget />

      {/* ToastContainer should be global */}
      <ToastContainer position="top-center" />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
      
      {/* Global Loading Styles */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </AuthProvider>
  );
}