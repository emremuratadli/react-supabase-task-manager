import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/authService";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!email.includes("@") || password.length < 6) {
      setError(
        "Please enter a valid email and a password with at least 6 characters."
      );
      return;
    }
    try {
      if (isSignUp) {
        await signUp(email, password);
        setSuccess(
          "Registration successful! Please check your email and then sign in."
        );
        setError("");
      } else {
        await signIn(email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Authentication error");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="username"
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "100%", paddingRight: 38 }}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              margin: 0,
              height: 24,
              width: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showPassword ? (
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.21-3.06 3.6-5.5 6.59-6.71M1 1l22 22" />
                <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.93 0 3.5-1.57 3.5-3.5 0-.47-.09-.92-.26-1.33" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <ellipse cx="12" cy="12" rx="10" ry="6" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {error && (
          <div className="error" style={{ color: "red", marginBottom: 10 }}>
            {error}
          </div>
        )}
        {success && !error && (
          <div
            className="success"
            style={{ color: "#22c55e", marginBottom: 10 }}
          >
            {success}
          </div>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
        {isSignUp ? "Already have an account? Sign In" : "No account? Sign Up"}
      </button>
    </div>
  );
}
