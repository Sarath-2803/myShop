import React from "react";

export default function Home() {
  return (
    <div style={{ background: "#f6faf8", minHeight: "100vh" }}>
      {/* Modern Premium Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 2px 16px #25d36618",
          zIndex: 100,
          padding: "0.7rem 0"
        }}
      >
        <div className="container">
          <a
            className="navbar-brand fw-bold d-flex align-items-center"
            href="/"
            style={{
              color: "#25D366",
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2.2rem",
              letterSpacing: "2px"
            }}
          >
            <span style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #25D366 60%, #128c4b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>myShopz</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "none" }}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
            <ul className="navbar-nav align-items-center gap-2 gap-lg-3 flex-row flex-lg-row">
              <li className="nav-item w-100 w-lg-auto mb-2 mb-lg-0">
                <a
                  href="/login"
                  className="btn btn-outline-success px-4 py-2 w-100 w-lg-auto"
                  style={{
                    borderRadius: "2rem",
                    borderColor: "#25D366",
                    color: "#25D366",
                    fontWeight: 600,
                    fontSize: "1rem",
                    minWidth: "110px",
                    boxShadow: "0 2px 8px #25d36611"
                  }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item w-100 w-lg-auto">
                <a
                  href="/signup"
                  className="btn btn-success px-4 py-2 w-100 w-lg-auto signup-btn"
                  style={{
                    borderRadius: "2rem",
                    background: "linear-gradient(90deg, #25D366 60%, #128c4b 100%)",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    minWidth: "110px",
                    color: "#fff",
                    boxShadow: "0 2px 16px #25d36622",
                    transition: "background 0.2s, box-shadow 0.2s, transform 0.15s"
                  }}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <style>
        {`
          .signup-btn:hover, .signup-btn:focus {
            background: linear-gradient(90deg, #128c4b 60%, #25D366 100%) !important;
            box-shadow: 0 6px 24px #25d36644;
            color: #fff !important;
            transform: translateY(-2px) scale(1.04);
          }
          .btn-outline-success:hover, .btn-outline-success:focus {
            background: #25D366 !important;
            color: #fff !important;
            border-color: #25D366 !important;
            box-shadow: 0 4px 16px #25d36633;
            transform: translateY(-2px) scale(1.03);
          }
          @media (max-width: 991.98px) {
            .navbar-nav .nav-item {
              width: 100%;
              margin-bottom: 0.5rem;
            }
            .navbar-nav .btn {
              width: 100%;
              min-width: 0;
              margin-bottom: 0.5rem;
            }
          }
          @media (min-width: 992px) {
            .navbar-nav .nav-item {
              width: auto;
              margin-bottom: 0;
            }
            .navbar-nav .btn {
              width: auto;
              margin-bottom: 0;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="container">
        <section
          className="banner-section text-center mx-auto"
          style={{
            background: "linear-gradient(120deg, #f8fafc 0%, #e2fbe5 100%)",
            borderRadius: "2.5rem",
            boxShadow: "0 8px 32px rgba(37,211,102,0.10)",
            padding: "3.5rem 2rem 2.5rem 2rem",
            marginTop: "2.5rem",
            marginBottom: "2.5rem"
          }}
        >
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <div className="brand mb-3" style={{
                fontSize: "2.8rem",
                color: "#128c4b",
                letterSpacing: "2px"
              }}>
                myShopz
              </div>
              <h1 className="fw-bold mb-3" style={{
                fontSize: "2.7rem",
                lineHeight: 1.15,
                color: "#1a2e22"
              }}>
                Your Shop. <span style={{ color: "#25D366" }}>Online</span>.<br />
                <span style={{ fontWeight: 400, color: "#444" }}>In Minutes.</span>
              </h1>
              <p className="lead mb-4" style={{
                color: "#444",
                fontSize: "1.25rem"
              }}>
                Create a stunning shop website, share your link, and get orders directly on WhatsApp.<br />
                <span style={{ color: "#25D366" }}>No code. No fees. No hassle.</span>
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                <a href="/signup" className="btn cta-btn cta-btn-primary btn-lg px-4 shadow-sm" style={{ fontSize: "1.18rem" }}>
                  Get Started Free
                </a>
                <a href="/login" className="btn cta-btn cta-btn-outline btn-lg px-4 shadow-sm" style={{ fontSize: "1.18rem" }}>
                  Login
                </a>
              </div>
              {/* 
              <div className="mt-4 d-flex align-items-center gap-2 justify-content-center justify-content-lg-start" style={{ fontSize: "1.05rem", color: "#128c4b" }}>
                <svg width="22" height="22" fill="#25D366" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1 15l-5-5 1.414-1.414L11 13.172l5.586-5.586L18 9l-7 7z"/></svg>
                Trusted by 500+ shop owners
              </div>
              */}
            </div>
            <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0 d-flex justify-content-center align-items-center">
              <svg
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                id="Online-Shop-Laptop-1--Streamline-Free-Illustrations"
                height="100%"
                width="100%"
                style={{
                  maxHeight: "340px",
                  width: "100%",
                  objectFit: "contain",
                  display: "block",
                  margin: "auto"
                }}
              >
                <desc>
                  Online Shop Laptop 1 Streamline Illustration: https://streamlinehq.com
                </desc>
                <g>
                  <path d="M40 219.276a160 160 0 1 0 320 0 160 160 0 1 0 -320 0Z" fill="#e8f4fa" stroke="#daedf7" strokeWidth="4"></path>
                  <path d="m227.108 20.724 0 20.8a3.2 3.2 0 0 1 -3.2 3.2l-53.836 0a3.2 3.2 0 0 1 -3.2 -3.2l0 -20.8" fill="#009fd9" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m304.4 186.8 -210.088 0a8 8 0 0 0 -8 8l0 135.528 226.088 0 0 -135.528a8 8 0 0 0 -8 -8Z" fill="#ffffff" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m296.452 202.748 -193.956 0 -0.224 127.58 194.18 0 0 -127.58z" fill="#80ddff" strokeWidth="1"></path>
                  <path d="M248.352 202.748 111.36 330.328l-9.088 0 0.224 -127.58 145.856 0z" fill="#b8ecff" strokeWidth="1"></path>
                  <path d="m296.452 202.748 -193.956 0 -0.224 127.58 194.18 0 0 -127.58z" fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="M77.004 362.248a127.68 7.98 0 1 0 255.36 0 127.68 7.98 0 1 0 -255.36 0Z" fill="#45413c" opacity=".15" strokeWidth="1"></path>
                  <path d="m332.364 346.288 -266 0 0 -11.96a4 4 0 0 1 4 -4l258 0a4 4 0 0 1 4 4Z" fill="#f0f0f0" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="M332.364 346.292a276.652 276.652 0 0 1 -75.964 10.636l-114.068 0a276.628 276.628 0 0 1 -75.968 -10.636l266 0Z" fill="#bdbec0" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="M244.076 132.484a17.512 17.512 0 0 0 -17.496 -17.492l-57.092 0A17.512 17.512 0 0 0 152 132.484l0 44.22 15.2 0 0 -44.22a4.328 4.328 0 0 1 4.272 -4.268l53.108 0a4.324 4.324 0 0 1 4.268 4.268l0 44.22 15.228 0Z" fill="#bf8256" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m268.548 318.172 -138.368 0a4.96 4.96 0 0 1 -4.952 -5.2l7.4 -147.792a4 4 0 0 1 3.948 -3.748l127.424 0a4 4 0 0 1 3.952 3.816l5.548 147.788a4.96 4.96 0 0 1 -4.952 5.136Z" fill="#f0d5a8" strokeWidth="1"></path>
                  <path d="m268.556 181.26 -0.6 -16a4 4 0 0 0 -3.956 -3.836l-127.424 0a4 4 0 0 0 -3.948 3.748l-0.8 16.088Z" fill="#f7e5c6" strokeWidth="1"></path>
                  <path d="m268.548 318.172 -138.368 0a4.96 4.96 0 0 1 -4.952 -5.2l7.4 -147.792a4 4 0 0 1 3.948 -3.748l127.424 0a4 4 0 0 1 3.952 3.816l5.548 147.788a4.96 4.96 0 0 1 -4.952 5.136Z" fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m170.768 44.732 0 8.468a3.2 3.2 0 0 0 3.2 3.2l46.064 0a3.2 3.2 0 0 0 3.2 -3.2l0 -8.468Z" fill="#ffffff" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m229.024 131.516 0 -5.684 6.256 0a19.468 19.468 0 0 1 7.648 1.556 13.776 13.776 0 0 0 0.104 -1.68l0 -17.976c0 -35.368 -23.716 -28.928 -23.716 -51.32l-44.688 0 0 10.688c0 11.444 -7.772 14.952 -7.772 34.972l0 32.056a7.772 7.772 0 0 0 15.544 0l0 3.872a7.772 7.772 0 0 0 15.544 0l0 3.888a7.772 7.772 0 1 0 15.544 0l0 2.428a7.772 7.772 0 1 0 15.54 0l0 -12.8Z" fill="#ffcebf" strokeWidth="1"></path>
                  <path d="m219.316 56.4 -44.688 0 0 10.688c0 6.672 -2.64 10.648 -4.844 16.772a82.68 82.68 0 0 1 70.844 7.268C234.596 73.784 219.316 74.4 219.316 56.4Z" fill="#ffb59e" strokeWidth="1"></path>
                  <path d="m229.024 131.516 0 -5.684 6.256 0a19.468 19.468 0 0 1 7.648 1.556 13.776 13.776 0 0 0 0.104 -1.68l0 -17.976c0 -35.368 -23.716 -28.928 -23.716 -51.32l-44.688 0 0 10.688c0 11.444 -7.772 14.952 -7.772 34.972l0 32.056a7.772 7.772 0 0 0 15.544 0l0 3.872a7.772 7.772 0 0 0 15.544 0l0 3.888a7.772 7.772 0 1 0 15.544 0l0 2.428a7.772 7.772 0 1 0 15.54 0l0 -12.8Z" fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m229.06 108.84 -0.016 25.604" fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m197.944 129.596 0 8.416" fill="#ffcebf" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m213.488 130.24 0 11.66" fill="#ffcebf" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m182.4 129.596 0 4.532" fill="#ffcebf" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="M165.364 225.692a6 6 0 1 0 12 0 6 6 0 1 0 -12 0Z" fill="#45413c" strokeWidth="1"></path>
                  <path d="M221.364 225.692a6 6 0 1 0 12 0 6 6 0 1 0 -12 0Z" fill="#45413c" strokeWidth="1"></path>
                  <path d="M173.4 249.6c14.34 20.772 37.6 20.772 51.928 0Z" fill="#ff866e" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  <path d="m229.064 161.424 15.012 0 0 -28.94a17.472 17.472 0 0 0 -15.02 -17.244l0 17.152 0 0.092Z" fill="#bf8256" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                </g>
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="container">
        <section className="features-section" id="features" style={{ padding: "2.5rem 0 2rem 0" }}>
          <div className="row g-4 justify-content-center">
            {[
              { icon: "⚡", title: "Launch in Minutes", desc: "Create your shop website and start selling in minutes. No technical skills required." },
              { icon: "🛒", title: "Go Online Instantly", desc: "Make your shop accessible 24/7. Share your unique shop link with customers anywhere." },
              { icon: "💬", title: "WhatsApp Orders", desc: "Receive orders directly on WhatsApp. Chat, confirm, and deliver with ease." },
              { icon: "🧩", title: "No Code, No Fuss", desc: "No coding or design skills needed. Our platform is built for everyone—just fill in your details and go live." },
              { icon: "👌", title: "Easy to Use", desc: "Simple, intuitive dashboard. Add products, manage your shop, and track orders effortlessly." },
              { icon: "🔗", title: "Share & Grow", desc: "Share your shop link on social media, WhatsApp, or anywhere. Grow your business online with zero barriers." },
            ].map((f, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={i}>
                <div className="feature-card h-100" style={{
                  background: "#fff",
                  borderRadius: "1.5rem",
                  boxShadow: "0 2px 16px #25d36611",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  transition: "box-shadow 0.2s, transform 0.15s"
                }}>
                  <div className="feature-icon" style={{
                    fontSize: "2.2rem",
                    marginBottom: "1rem"
                  }}>{f.icon}</div>
                  <div className="feature-title" style={{
                    fontWeight: 700,
                    fontSize: "1.18rem",
                    color: "#128c4b",
                    marginBottom: "0.5rem"
                  }}>{f.title}</div>
                  <div className="feature-desc" style={{
                    color: "#444",
                    fontSize: "1.05rem"
                  }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section" style={{ padding: "2.5rem 0 2rem 0" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="testimonial-card mx-auto" style={{
                background: "#fff",
                borderRadius: "1.5rem",
                boxShadow: "0 2px 16px #25d36611",
                padding: "2rem 1.5rem",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "1.5rem", color: "#25D366" }}>“</div>
                <div style={{ color: "#222", fontSize: "1.08rem", marginBottom: "1rem" }}>
                  myShopz made it so easy to take my business online. I set up my shop in minutes and started getting orders on WhatsApp the same day!
                </div>
                <div className="testimonial-author" style={{ color: "#128c4b", fontWeight: 600 }}>— A Happy Shop Owner</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section mx-auto" style={{
          background: "linear-gradient(90deg, #25D366 60%, #128c4b 100%)",
          borderRadius: "2rem",
          boxShadow: "0 4px 24px #25d36633",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          color: "#fff",
          marginBottom: "2.5rem"
        }}>
          <h3 className="fw-bold mb-3" style={{ color: "#fff" }}>Ready to make your shop online?</h3>
          <p className="mb-3" style={{ fontSize: "1.15rem" }}>
            Join hundreds of shop owners who trust <span style={{ fontFamily: "'Dancing Script',cursive", color: "#fff" }}>myShop</span> to grow their business.
          </p>
          <a href="/signup" className="btn btn-light btn-lg px-4 cta-btn"
            style={{
              borderRadius: "2rem",
              fontWeight: 700,
              boxShadow: "0 2px 16px #fff4",
              color: "#25D366",
              background: "#fff",
              border: "none",
              transition: "background 0.2s, color 0.2s, box-shadow 0.2s"
            }}
          >
            Start Free Now
          </a>
        </section>

        {/* About Section */}
        <section className="about-section text-center mb-5" id="about">
          <h2 className="fw-bold mb-3" style={{ color: "#25D366", fontSize: "2rem" }}>Why myShopz?</h2>
          <p style={{
            fontSize: "1.15rem",
            color: "#444",
            maxWidth: "600px",
            margin: "auto"
          }}>
            myShopz empowers anyone to launch an online shop in minutes, manage products easily, and receive orders directly on WhatsApp. No coding, no fees—just simple, effective selling for everyone!
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small" style={{
        background: "#f8fafc",
        borderTop: "1px solid #e2e8f0",
        letterSpacing: "0.5px"
      }}>
        &copy; {new Date().getFullYear()} <span style={{ color: "#25D366", fontFamily: "'Dancing Script',cursive" }}>myShopz</span>
      </footer>
    </div>
  );
}