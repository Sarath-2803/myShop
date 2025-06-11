import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const active = (path) => location.pathname === path ? " active" : "";
  const [user,setUser] = useState({});
  useEffect(() => {
    fetch("https://myshop-backend-8177.onrender.com/account", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser({}));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg mt-0" style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            color: "#25D366"
          }}>
            myShop
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link px-3${active("/dashboard")}`} to="/dashboard" style={{ transition: "color 0.2s" }}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3${active("/about")}`} to="/about" style={{ transition: "color 0.2s" }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3${active("/contact")}`} to="/contact" style={{ transition: "color 0.2s" }}>
                Contact
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <a
                href={`/myshop/${user.siteName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success align-items-center me-lg-3 d-flex"
              >
                View Shop
              </a>
            </li>
            <li className="nav-item ms-lg-0 d-flex justify-content-center align-items-center" style={{ minHeight: "40px" }}>
              <Link
                to="/account"
                className={`nav-link p-0 account-link d-flex align-items-center justify-content-center${active("/account")}`}
                style={{ height: "40px", width: "40px" }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="account-svg"
                  style={{ display: "block", margin: "0 auto" }}
                >
                  <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" />
                  <path d="M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5Z" stroke="#222" strokeWidth="2" />
                  <path d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384" stroke="#222" strokeWidth="2" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <style>{`
        .navbar-nav .nav-link {
          color: #222;
          font-weight: 500;
          border-radius: 0.5rem;
        }
        .navbar-nav .nav-link.active,
        .navbar-nav .nav-link:hover {
          color: #fff !important;
          background: #25D366;
        }
        .navbar {
          box-shadow: 0 2px 8px rgba(37,211,102,0.04);
        }
        .account-link .account-svg {
          transition: background 0.2s, stroke 0.2s;
          border-radius: 50%;
        }
        .account-link.active-account .account-svg,
        .account-link:hover .account-svg {
          background: #25D36622;
        }
        .account-link.active-account .account-svg circle,
        .account-link.active-account .account-svg path,
        .account-link:hover .account-svg circle,
        .account-link:hover .account-svg path {
          stroke: #128c4b;
        }
        @media (max-width: 991.98px) {
          .navbar-nav {
            text-align: center;
            width: 100%;
          }
          .navbar-nav .nav-item {
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .navbar-nav .nav-link,
          .navbar-nav .btn {
            width: 100%;
            justify-content: center;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .navbar-nav .nav-item.ms-lg-0 {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
        }
      `}</style>
    </nav>
  );
}