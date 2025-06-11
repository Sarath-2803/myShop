import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function ShopTemplate() {
  const { siteName } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://myshop-backend-8177.onrender.com/myshop/${siteName}`)
      .then((res) => res.json())
      .then((data) => {
        setShop({
          shopName: data.shopName,
          siteName: data.siteName,
          number: data.number,
        });
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteName]);

  function getDropboxImageUrl(url) {
    if (!url) return "";
    return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container py-5 text-center">
        <h2>Shop not found</h2>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>{shop.shopName} - myShop</title>
    </Helmet>
    <div style={{ backgroundColor: "#f5f5f7", minHeight: "100vh" }}>
      {/* Navbar with only the shop's name */}
      <nav className="navbar" style={{ background: "#25D366", boxShadow: "0 2px 8px #25d36622" }}>
        <div className="container d-flex justify-content-center">
          <span
            className="navbar-brand mb-0 h1"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "2.2rem",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              color: "#fff",
              textAlign: "center",
              width: "100%",
              display: "block",
              textShadow: "0 2px 8px #0001"
            }}
          >
            {shop.shopName}
          </span>
        </div>
      </nav>
      <div className="container py-5">
        {/* <div className="text-center mb-5">
          <div style={{ color: "#444", fontSize: "1.2rem" }}>
            {shop.siteName && <span>@{shop.siteName}</span>}
          </div>
        </div> */}
        <div className="row g-3 g-sm-4 justify-content-center">
          {items.length === 0 && (
            <div className="text-center text-muted">No items found.</div>
          )}
          {items.map((item) => (
            <div className="col-10 col-sm-8 col-md-6 col-lg-3 d-flex" key={item.id}>
              <ShopItemCard item={item} shop={shop} getDropboxImageUrl={getDropboxImageUrl} />
            </div>
          ))}
        </div>
      </div>
      {/* Built with myShop - separate from footer */}
      <div className="text-center py-2" style={{ fontSize: "1rem", fontWeight: 600,color: "gray"}}>
        Built with <a href="/" style={{ color: "#25D366", fontWeight: 700,textDecoration:'none' }}>myShopz</a>
      </div>
      <footer className="text-center py-3 text-muted small" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        &copy; {new Date().getFullYear()}{" "}
        <span style={{ color: "#25D366", fontFamily: "'Dancing Script',cursive" }}>{shop.shopName}</span>
      </footer>
      <style>{`
        .btn.whatsapp-order-btn {
          background-color: #25D366;
          border: none;
          color: #fff;
          transition: background 0.2s, box-shadow 0.2s;
          display: block;
        }
        .btn.whatsapp-order-btn:hover,
        .btn.whatsapp-order-btn:focus {
          background-color: #1ebe57;
          color: #fff;
          box-shadow: 0 4px 16px rgba(37,211,102,0.12);
        }
        .btn.whatsapp-order-btn:active {
          filter: brightness(0.97);
          box-shadow: 0 2px 12px rgba(37,211,102,0.10);
          transform: scale(0.98);
        }
        .btn.whatsapp-order-btn .bi-whatsapp {
          transition: transform 0.2s, filter 0.2s;
        }
        .btn.whatsapp-order-btn:hover .bi-whatsapp,
        .btn.whatsapp-order-btn:focus .bi-whatsapp {
          transform: scale(1.2) rotate(-8deg);
          filter: brightness(1.2) drop-shadow(0 0 4px #25D36688);
        }
        .card {
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .card:active {
          filter: brightness(0.97);
          box-shadow: 0 2px 12px rgba(37,211,102,0.10);
          transform: scale(0.98);
        }
        .card:hover {
          transform: translateY(-6px) scale(1.025);
          box-shadow: 0 12px 36px rgba(37,211,102,0.18);
        }
      `}</style>
    </div>
    </>
  );
}

// Place this component above your export default function ShopTemplate()
function ShopItemCard({ item, shop, getDropboxImageUrl }) {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  return (
    <div
      className="card shop-card shadow-lg border-0 mb-4 position-relative mx-auto"
      style={{
        borderRadius: "1.2rem",
        background: "#fff",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: 0,
        height: "325px",
        width: "100%",
        maxWidth: "320px",
        overflow: "hidden",
        boxShadow: "0 6px 32px 0 rgba(37,211,102,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08)"
      }}
    >
      {/* Image or Placeholder */}
      <div style={{ width: "100%", height: "200px", position: "relative" }}>
        {!imgLoaded && (
          <div
            className="placeholder-glow"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1.2rem 1.2rem 0 0",
              background: "linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)",
              animation: "placeholderShimmer 1.2s infinite linear"
            }}
          />
        )}
        <img
          src={getDropboxImageUrl(item.image)}
          className="card-img-top mb-2"
          alt={item.name}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "1.2rem 1.2rem 0 0",
            objectFit: "cover",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            background: "#e2e8f0",
            transition: "opacity 0.2s",
            opacity: imgLoaded ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0
          }}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="card-body d-flex flex-column justify-content-between align-items-center p-3" style={{ minHeight: "120px", marginTop: "-15px" }}>
        <h5
          className="card-title text-center mb-2"
          style={{marginTop:"5px",
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "0.5px",
   
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textShadow: "0 2px 8px #25d36622",
            textAlign: "center",
          }}
        >
          {item.name}
        </h5>
        <p className="card-text text-center mb-2" style={{ fontWeight: "bold", fontSize: "1.05rem",textAlign:"center" }}>₹{item.price}</p>
        <div className="justify-content-center w-100 d-flex">
          <a
            href={`https://wa.me/${shop.number}?text=Hi, I want to order ${encodeURIComponent(item.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn d-flex align-items-center justify-content-center gap-2 rounded-pill fw-bold whatsapp-order-btn"
            style={{
              width: "100%",
              minWidth: "120px",
              maxWidth: "260px",
              margin: "0 auto",
              height: "38px",
              fontSize: "1rem"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
              className="bi bi-whatsapp me-2" viewBox="0 0 16 16">
              <path
                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            Order
          </a>
        </div>
      </div>
      <style>{`
        @keyframes placeholderShimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        .placeholder-glow {
          background-size: 800px 200px;
        }
        .shop-card {
          box-shadow: 0 6px 32px 0 rgba(37,211,102,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08) !important;
          border: 1.5px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}