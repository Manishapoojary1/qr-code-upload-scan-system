import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const btnStyle = (path) => ({
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    background:
      location.pathname === path
        ? "linear-gradient(90deg,#4f46e5,#6366f1)"
        : "#eef2ff",
    color: location.pathname === path ? "#fff" : "#1f2937",
    boxShadow:
      location.pathname === path
        ? "0 8px 20px rgba(79,70,229,0.35)"
        : "none",
    transition: "all 0.3s ease"
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        padding: "20px 40px",
        background: "transparent",
        alignItems: "center"
      }}
    >
      <Link to="/upload" style={{ textDecoration: "none" }}>
        <button style={btnStyle("/upload")}>Scan QR</button>
      </Link>

      <Link to="/history" style={{ textDecoration: "none" }}>
        <button style={btnStyle("/history")}>History</button>
      </Link>

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
          fontSize: "14px",
          transition: "all 0.3s"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#fee2e2";
          e.target.style.color = "#b91c1c";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#fff";
          e.target.style.color = "#000";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
