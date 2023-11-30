import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // Import the new Home component

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Router>
        <Header className="z-10" />
        <div
          className="absolute inset-0"
          style={{
            zIndex: -1,
            backgroundImage: "url('/background.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: `center ${scrollPosition * 0.5}px`, // Adjust the multiplier for the parallax effect
            filter: "brightness(20%)",
          }}
        />
        <div className="mx-8 md:mx-10 p-10 relative z-20">
          <Routes>
            <Route path="/" element={<Home />} />
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
