import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About myShopz</title>
      </Helmet>
      <Header />
      <div className="container py-5">

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <div className="mx-auto" style={{ maxWidth: "700px" }}>
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
            <h2
              className="mb-3"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#25D366",
              }}
            >
              About myShopz
            </h2>
            <p className="lead mb-4" style={{ color: "#444" }}>
              <strong>myShopz</strong> is a simple, free platform that helps anyone take their shop online and start
              receiving orders directly on WhatsApp—no coding or technical skills required!
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <span style={{ color: "#25D366" }}>✔</span> Set up your shop website in minutes
              </li>
              <li className="mb-2">
                <span style={{ color: "#25D366" }}>✔</span> Share your unique shop link with customers
              </li>
              <li className="mb-2">
                <span style={{ color: "#25D366" }}>✔</span> Manage products and prices easily
              </li>
              <li className="mb-2">
                <span style={{ color: "#25D366" }}>✔</span> Get orders instantly on WhatsApp
              </li>
              <li className="mb-2">
                <span style={{ color: "#25D366" }}>✔</span> No fees, no hidden charges
              </li>
            </ul>
            <p>
              <strong>Why myShopz?</strong>
              <br />
              We believe every small business deserves an online presence. myShop is built to empower shop owners, home
              businesses, and creators to reach more customers with zero hassle.
            </p>
            <p>
              <strong>Who made this?</strong>
              <br />
              myShopz is a passion project by an indie developer who wants to make e-commerce accessible to everyone.
              {/* If you like this platform, consider <a href="https://www.buymeacoffee.com/" target="_blank" style={{ color: "#25D366" }}>supporting with a coffee</a>! */}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}