import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://myshop-backend-8177.onrender.com/account", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Account - myShop</title>
      </Helmet>
      <Header />
    <div className="container">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div
        className="account-card mt-5 mb-5"
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
          className="account-title mb-4 text-center"
          style={{
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#25D366",
          }}
        >
          User Details
        </h4>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={user.name} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Shop Name</label>
          <input type="text" className="form-control" value={user.shopName} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Site Name</label>
          <input type="text" className="form-control" value={user.siteName} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="number" className="form-control" value={user.number} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={user.email} disabled />
        </div>
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary mb-2 account-action-btn"
            style={{
              background: "#25D366",
              border: "none",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
            onClick={() => (window.location.href = "/updateaccount")}
          >
            Update
          </button>
          <button
            className="btn btn-danger fw-bold account-action-btn account-signout-btn"
            style={{ letterSpacing: "0.5px" }}
            onClick={() => {
              if (window.confirm("Are you sure you want to sign out?")) {
                fetch("https://myshop-backend-8177.onrender.com/logout", {
                  method: "GET",
                  credentials: "include",
                }).then(() => (window.location.href = "/login"));
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-box-arrow-right me-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-7A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.354 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L13.293 7.5H5.5a.5.5 0 0 0 0 1h7.793l-1.647 1.646a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            Sign Out
          </button>
        </div>
        <style>{`
          .account-action-btn {
            transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.15s;
          }
          .account-action-btn:hover, .account-action-btn:focus {
            background: #128c4b !important;
            color: #fff !important;
            box-shadow: 0 4px 16px #25d36633;
            transform: translateY(-2px) scale(1.03);
          }
          .account-signout-btn:hover, .account-signout-btn:focus {
            background: #c82333 !important;
            color: #fff !important;
          }
        `}</style>
      </div>
    </div>
    <Footer />
    </div>
  );
}