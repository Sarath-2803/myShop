import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://myshop-backend-8177.onrender.com/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- this is important
      body: JSON.stringify(form),
    });
    setSubmitted(true);
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us - myShop</title>
      </Helmet>
      <Header />
      <div className="container py-5">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
            <h2
              className="mb-3"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#25D366",
              }}
            >
              Contact Us
            </h2>
            <p className="mb-4" style={{ color: "#444" }}>
              Have questions, feedback, or need help? We'd love to hear from you!
            </p>
            {submitted ? (
              <div className="alert alert-success">
                Thank you for contacting us! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="4"
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success px-4">
                  Send Message
                </button>
              </form>
            )}
            <div className="mt-4 text-muted small">
              Or email us directly at{" "}
              <a
                href="mailto:customerhelp.myprod@gmail.com"
                style={{ color: "#25D366" }}
              >
                customerhelp.myprod@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}