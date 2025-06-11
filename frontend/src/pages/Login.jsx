import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading
    try {
      const res = await fetch("https://myshop-backend-8177.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      setLoading(false); // Stop loading
      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch {
      setLoading(false); // Stop loading
      setError("Network error");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f8fafc 0%, #e2fbe5 100%)",
        padding: "2rem 0",
      }}
    >
      <Helmet>
        <title>Login - myShopz</title>
      </Helmet>
      <div
        className="login-card p-4"
        style={{
          width: "100%",
          maxWidth: 380,
          margin: "auto",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px rgba(37,211,102,0.10)",
          background: "#fff",
          padding: "2.2rem 2rem 1.7rem 2rem",
        }}
      >
        <div className="text-center mb-4">
          <a href="/"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2.2rem",
              color: "#25D366",
              letterSpacing: "2px",
              fontWeight: 700,
              display: "inline-block",
              marginBottom: "0.5rem",
              textDecoration: "none",
            }}
          >
            myShopz
          </a>
          <h2 className="fw-bold mb-1" style={{ letterSpacing: "1px", fontSize: "1.7rem" }}>
            Login
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{ fontSize: "1rem", borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ fontSize: "1rem", borderRadius: "0.8rem" }}
            />
          </div>
          {loading && (
            <div className="text-center my-2 text-success">Logging in, please wait...</div>
          )}
          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold mb-2"
            style={{
              borderRadius: "2rem",
              fontSize: "1.1rem",
              background: "linear-gradient(90deg, #25D366 60%, #128c4b 100%)",
              border: "none",
              boxShadow: "0 2px 8px #25d36622",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
            }}
            disabled={loading}
          >
            Login
          </button>
        </form>
        <div className="text-center my-2 text-muted" style={{ fontSize: "1rem" }}>
          or
        </div>
        <div className="d-grid mb-2">
          <a
            href="https://myshop-backend-8177.onrender.com/auth/google"
            className="btn btn-outline-dark google-btn"
            style={{
              borderRadius: "2rem",
              fontWeight: 500,
              fontSize: "1.05rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              width="20"
              alt="Google logo"
              style={{ verticalAlign: "middle", marginRight: 8, marginTop: -2 }}
            />
            Sign in with Google
          </a>
        </div>
        <div className="text-center my-3" style={{ fontSize: "1rem" }}>
          <span className="text-muted">Don't have an account?</span>{" "}
          <a href="/signup" className="fw-bold" style={{ color: "#25D366" }}>
            Sign Up
          </a>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 480px) {
            .login-card {
              padding: 1.2rem 0.7rem 1.2rem 0.7rem !important;
              max-width: 85vw !important;
              border-radius: 1rem !important;
            }
            .login-card h2 {
              font-size: 1.3rem !important;
            }
            .login-card .btn-success:hover,
            .login-card .btn-success:focus,
            .login-card .btn-success:active {
              background: linear-gradient(90deg, #128c4b 60%, #25D366 100%) !important;
              box-shadow: 0 4px 16px #25d36633;
              color: #fff !important;
              transform: translateY(-2px) scale(1.03);
            }
          }
          .login-card .btn-success:hover, .login-card .btn-success:focus {
            background: linear-gradient(90deg, #128c4b 60%, #25D366 100%) !important;
            box-shadow: 0 4px 16px #25d36633;
            color: #fff !important;
            transform: translateY(-2px) scale(1.03);
          }
        `}
      </style>
    </div>
  );
}