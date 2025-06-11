import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{
        background: "linear-gradient(120deg, #f8fafc 0%, #e2fbe5 100%)",
        borderTop: "1px solid #e2e8f0",
        color: "#222",
        fontSize: "1rem",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div
          className="mb-2 mb-md-0"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1.4rem",
            color: "#25D366",
            fontWeight: 700,
          }}
        >
          <Link to="/" style={{ color: "#25D366", textDecoration: "none" }}>
            myShop
          </Link>
        </div>
        <div className="text-muted small">
          &copy; {new Date().getFullYear()} myShopz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}