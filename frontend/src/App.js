import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // Import the new Home component

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Header />
        <div className="mx-8 md:mx-10 p-10">
          <Routes>
            <Route path="/" element={<Home />} /> {/* New Home route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
