import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    siteName: "",
    number: "",
    email: "",
    password: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.terms) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    // Only send required fields to backend
    const payload = {
      name: form.name,
      shopName: form.shopName,
      siteName: form.siteName,
      number: form.number,
      email: form.email,
      password: form.password,
    };
    try {
      const res = await fetch("https://myshop-backend-8177.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(120deg, #f8fafc 0%, #e2fbe5 100%)",
        padding: "2rem 0"
      }}
    >
      <Helmet>
        <title>Sign Up - myShopz</title>
      </Helmet>
      <div
        className="signup-card mt-4 mb-4 w-100"
        style={{
          width: "100%",
          maxWidth: 370,
          margin: "auto",
          borderRadius: "1.2rem",
          boxShadow: "0 8px 32px rgba(37,211,102,0.10)",
          background: "#fff",
          padding: "2rem 2rem 1.5rem 2rem",
        }}
      >
        <div className="text-center mb-3">
          <a
            href="/"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2.1rem",
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
          <h2 className="fw-bold mb-1" style={{ letterSpacing: "1px", fontSize: "1.5rem" }}>
            Sign Up
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Shop Name</label>
            <input
              type="text"
              className="form-control"
              name="shopName"
              required
              placeholder="eg: ABC Store"
              value={form.shopName}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Site Name</label>
            <input
              type="text"
              className="form-control"
              name="siteName"
              required
              placeholder="eg: abcstore"
              value={form.siteName}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="number"
              required
              placeholder="WhatsApp number"
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              inputMode="numeric"
              title="Please enter a 10-digit phone number"
              value={form.number}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{ borderRadius: "0.8rem" }}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Agree to terms and conditions
            </label>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{
              borderRadius: "2rem",
              fontSize: "1.08rem",
              background: "linear-gradient(90deg, #25D366 60%, #128c4b 100%)",
              border: "none",
              boxShadow: "0 2px 8px #25d36622",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
            }}
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-3" style={{ fontSize: "1rem" }}>
          <span className="text-muted">Already have an account?</span>
          <a href="/login" className="fw-bold ms-1" style={{ color: "#25D366" }}>
            Login
          </a>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 480px) {
            .signup-card {
              padding: 1.2rem 0.7rem 1.2rem 0.7rem !important;
              max-width: 85vw !important;
              border-radius: 1rem !important;
              box-shadow: 0 4px 16px rgba(37,211,102,0.13) !important;
            }
            .signup-card h2 {
              font-size: 1.1rem !important;
            }
            .signup-card .btn-success {
              font-size: 1rem !important;
              padding: 0.7rem 1rem !important;
            }
          }
          .signup-card .btn-success:hover, .signup-card .btn-success:focus {
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