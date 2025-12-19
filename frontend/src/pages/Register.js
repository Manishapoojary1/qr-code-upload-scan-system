import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      setError("");

      // 🔥 FIX: call /register instead of /login
      await api.post("/auth/register", {
        email,
        password
      });

      // After successful registration, redirect to login
      navigate("/");

    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <div className="auth-footer">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
