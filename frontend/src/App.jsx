import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { Routes, Route } from 'react-router-dom';
import ChatDashboard from "./Pages/Dashboard/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ChatDashboard/>} />
    </Routes>
  );
}
