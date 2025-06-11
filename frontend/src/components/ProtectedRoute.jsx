import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/loggedin", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setAuthenticated(true);
        else setAuthenticated(false);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
}