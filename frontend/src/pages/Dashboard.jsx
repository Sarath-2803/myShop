import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", image: "", price: "" });
  const [loading, setLoading] = useState(false);

  // For update modal
  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
  });
  const updateModalRef = useRef();
  const updateModalInstance = useRef(); // <-- add this
  // For delete modal
  const [deleteId, setDeleteId] = useState("");
  const deleteModalRef = useRef();
  const deleteModalInstance = useRef();

  // Create modal instances only once
  useEffect(() => {
    if (window.bootstrap && updateModalRef.current) {
      updateModalInstance.current = new window.bootstrap.Modal(updateModalRef.current);
    }
    if (window.bootstrap && deleteModalRef.current) {
      deleteModalInstance.current = new window.bootstrap.Modal(deleteModalRef.current);
    }
  }, []);

  // Fetch items
  useEffect(() => {
    fetch("http://localhost:3000/items", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]));
  }, [loading]);

  // Add item
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("http://localhost:3000/additem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    setForm({ name: "", image: "", price: "" });
    setLoading(false);
  };

  // Open update modal
  const openUpdateModal = (item) => {
    setUpdateForm(item);
    setTimeout(() => {
      if (updateModalInstance.current) {
        updateModalInstance.current.show();
      }
    }, 0);
  };

  // Update item
  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('http://localhost:3000/update', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: updateForm.id,
        name: updateForm.name,
        image: updateForm.image,
        price: updateForm.price,
      }),
    });
    setLoading(false);
    // Close modal programmatically after update
    if (updateModalInstance.current) {
      updateModalInstance.current.hide();
    }
  };

  // Open delete modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setTimeout(() => {
      if (deleteModalInstance.current) {
        deleteModalInstance.current.show();
      }
    }, 0);
  };

  // Delete item
  const confirmDelete = async () => {
    setLoading(true);
    await fetch(`http://localhost:3000/delete/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLoading(false);
    // Close modal programmatically after delete
    if (deleteModalInstance.current) {
      deleteModalInstance.current.hide();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard - myShop</title>
      </Helmet>
        <Header/>
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        minHeight: "100vh",
        paddingTop: 0,
        paddingBottom: 40,
      }}
    >
     
      <div className="container py-5">
        {/* Add Item Form */}
        <div
          className="dashboard-card mb-4"
          style={{
            background: "#fff",
            borderRadius: "1.2rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            padding: "2rem 2rem 1.5rem 2rem",
            marginBottom: "2rem",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h4
            className="dashboard-title mb-4"
            style={{ fontWeight: 700, letterSpacing: "1px" }}
          >
            Add Item
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
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
              <label className="form-label">Image Link</label>
              <div
                className="alert alert-info py-2 mb-2"
                style={{ fontSize: "0.97rem" }}
              >
                Please upload your item image to{" "}
                <a
                  href="https://www.dropbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dropbox
                </a>{" "}
                and paste the shared link here.
              </div>
              <input
                type="text"
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Item Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        </div>

        {/* Items Table */}
        <div className="table-responsive">
          <table className="table text-center align-middle border rounded-3 shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-muted text-center">
                    No items found.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="text-truncate" style={{ maxWidth: 120 }}>
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.image}
                    </a>
                  </td>
                  <td>₹{item.price}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span
                      className="me-3 badge text-bg-primary text-center cursor-pointer"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      onClick={() => openUpdateModal(item)}
                    >
                      Update
                    </span>
                    <span
                      className="badge text-bg-danger cursor-pointer"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        <div
          className="modal fade"
          id="updateModal"
          tabIndex="-1"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
          ref={updateModalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="updateModalLabel">
                    Update Item
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input type="hidden" name="id" value={updateForm.id} />
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updateForm.name}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={updateForm.image}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={updateForm.price}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
          ref={deleteModalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete Confirmation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this item?</p>
                <p>This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}