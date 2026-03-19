import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Diet from "./pages/Diet";
import ActiveWorkout from "./pages/ActiveWorkout";
import Chat from "./pages/Chat";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importe o novo componente

// Componente para proteger rotas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-gym-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gym-orange border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Rota atualizada */}

          {/* Rotas Privadas */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/diet" element={<PrivateRoute><Diet /></PrivateRoute>} />
          <Route path="/workout" element={<PrivateRoute><ActiveWorkout /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
