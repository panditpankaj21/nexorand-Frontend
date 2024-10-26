// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/NavBar";
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, loading } = useAuth();

  // While loading, you can show a loading state if necessary
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={<RegistrationPage />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
      </Routes> 
    </Router>
  );
}
