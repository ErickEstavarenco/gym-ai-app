import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Diet from "./pages/Diet";
import ActiveWorkout from "./pages/ActiveWorkout";
import Chat from "./pages/Chat";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/workout" element={<ActiveWorkout />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;