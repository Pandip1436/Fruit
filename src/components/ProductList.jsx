import { useState } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import ConfirmDialog from "./ConfirmDialog";
import { Link } from "react-router-dom";

import {
  deleteProduct,
  updateProduct,
  deleteAllProducts
} from "../services/api";

function ProductList({ products, setProducts, showToast }) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  /* ---------------- DELETE ONE ---------------- */
  const confirmDelete = id => {
    setDeleteId(id);
    setConfirmType("deleteOne");
  };

  const handleDelete = async () => {
    await deleteProduct(deleteId);
    setProducts(products.filter(p => p._id !== deleteId));
    showToast("🗑 Product deleted", "info");
    setConfirmType(null);
    setDeleteId(null);
  };

  /* ---------------- CLEAR ALL ---------------- */
  const confirmClearAll = () => {
    setConfirmType("clearAll");
  };

  const handleConfirm = async () => {
    if (confirmType === "deleteOne") {
      await handleDelete();
    }

    if (confirmType === "clearAll") {
      await deleteAllProducts();
      setProducts([]);
      showToast("🧹 All products cleared", "info");
      setConfirmType(null);
    }
  };

  /* ---------------- UPDATE QTY ---------------- */
  const handleQuantity = async (id, change) => {
    const product = products.find(p => p._id === id);
    if (!product) return;

    const updated = await updateProduct(id, {
      quantity: product.quantity + change
    });

    setProducts(products.map(p => (p._id === id ? updated : p)));
  };

  /* ---------------- EDIT PRODUCT ---------------- */
  const handleEdit = async updatedProduct => {
    const updated = await updateProduct(updatedProduct._id, updatedProduct);

    setProducts(products.map(p =>
      p._id === updated._id ? updated : p
    ));

    showToast("✏ Product updated", "success");
  };

  /* ---------------- FILTER + SORT ---------------- */
  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      if (sortType === "qty") return b.quantity - a.quantity;
      return 0;
    });

  return (
    <div className="space-y-6">

      {/* CONTROLS */}
      <div className="bg-white p-4 rounded-xl shadow-md space-y-3 md:space-y-0 md:flex md:items-center md:gap-3">

        {/* SEARCH */}
        <input
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* SORT */}
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="w-full md:w-1/4 border rounded-md px-3 py-2 focus:outline-none"
        >
          <option value="">Sort By</option>
          <option value="name">Name A → Z</option>
          <option value="qty">Quantity High → Low</option>
        </select>

        {/* CLEAR */}
        {products.length > 0 && (
          <button
            onClick={confirmClearAll}
            className="w-full md:w-auto bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition"
          >
            🧹 Clear All
          </button>
        )}

        {/* ADD PRODUCT */}
        <Link
          to="/admin/add"
          className="w-full md:w-auto md:ml-auto  flex text-center bg-green-600 text-white px-20 py-2 rounded-md hover:bg-green-700 transition"
        >
          ➕ Add Product
        </Link>
      </div>

      {/* LIST */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600 text-center">
          No products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductItem
              key={product._id}
              product={product}
              onDelete={() => confirmDelete(product._id)}
              onQuantityChange={handleQuantity}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* CONFIRM DIALOG */}
      {confirmType && (
        <ConfirmDialog
          message={
            confirmType === "clearAll"
              ? "Are you sure you want to delete ALL products?"
              : "Are you sure you want to delete this product?"
          }
          onConfirm={handleConfirm}
          onCancel={() => setConfirmType(null)}
        />
      )}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ProductList;
