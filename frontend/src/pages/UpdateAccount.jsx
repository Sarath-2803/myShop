import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

export default function UpdateAccount() {
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    siteName: "",
    number: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch current user data
  useEffect(() => {
    fetch("https://myshop-backend-8177.onrender.com/account", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          shopName: data.shopName || "",
          siteName: data.siteName || "",
          number: data.number || "",
          email: data.email || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load account details.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("https://myshop-backend-8177.onrender.com/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("Account updated successfully!");
      } else {
        const data = await res.json();
        setError(data.message || "Update failed");
      }
    } catch {
      setError("Network error");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update Account - myShop</title>
      </Helmet>
      <Header />
    <div className="container">
      
      <div
        className="update-card mt-5 mb-5"
        style={{
          background: "#fff",
          borderRadius: "1.2rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          padding: "2.5rem 2rem 2rem 2rem",
          maxWidth: "420px",
          margin: "2rem auto 0 auto",
        }}
      >
        <h4
          className="update-title mb-4 text-center"
          style={{
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#25D366",
          }}
        >
          Update Details
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Shop Name</label>
            <input
              type="text"
              className="form-control"
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Site Name</label>
            <input
              type="text"
              className="form-control"
              name="siteName"
              value={form.siteName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              disabled
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary update-submit-btn"
              style={{
                background: "#25D366",
                border: "none",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    <style>{`
      .update-submit-btn {
        transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.15s;
      }
      .update-submit-btn:hover, .update-submit-btn:focus {
        background: #128c4b !important;
        color: #fff !important;
        box-shadow: 0 4px 16px #25d36633;
        transform: translateY(-2px) scale(1.03);
      }
    `}</style>
    </div>
  );
}