import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";  // Import the CSS

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL)

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>

      {/* Show logout only when on the dashboard page */}
      {location.pathname === "/dashboard" && (
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
