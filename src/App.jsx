import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WorkoutProvider } from "./context/WorkoutContext";

// Importação das Páginas
import Home from "./pages/Home";
import Diet from "./pages/Diet";
import ActiveWorkout from "./pages/ActiveWorkout";
import Chat from "./pages/Chat";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

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
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rotas Privadas */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/diet" element={<PrivateRoute><Diet /></PrivateRoute>} />
            <Route path="/workout" element={<PrivateRoute><ActiveWorkout /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* Redirecionar rotas inexistentes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;
