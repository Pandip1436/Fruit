import { useState } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import ConfirmDialog from "./ConfirmDialog";
import { Link } from "react-router-dom";
import "../pages/css/ProductList.css"


function ProductList({ products, setProducts, showToast }) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // SINGLE DELETE
  const confirmDelete = id => {
    setDeleteId(id);
    setConfirmType("deleteOne");
  };

  // CLEAR ALL
  const confirmClearAll = () => {
    setConfirmType("clearAll");
  };

  const handleConfirm = () => {
    if (confirmType === "deleteOne") {
      setProducts(products.filter(p => p.id !== deleteId));
      showToast("🗑 Product deleted", "info");
    }

    if (confirmType === "clearAll") {
      setProducts([]);
      showToast("🧹 All products cleared", "info");
    }

    setConfirmType(null);
    setDeleteId(null);
  };

  const handleQuantity = (id, change) => {
    setProducts(
      products.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + change } : p
      )
    );
  };

  const handleEdit = updatedProduct => {
    setProducts(
      products.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
    showToast("✏ Product updated", "success");
  };

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      if (sortType === "qty") return b.quantity - a.quantity;
      return 0;
    });

  return (
    <>
      {/* SEARCH + SORT + CLEAR ALL */}
      <div className="controls">
        <input
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name A → Z</option>
          <option value="qty">Quantity High → Low</option>
        </select>

        {products.length > 0 && (
          <button className="clear-btn" onClick={confirmClearAll}> 🧹 Clear All </button>

        )}
        
        <button className="add-btn">
           <Link to="/admin/add" className="add-link">Add Product</Link>
        </button>


        
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        filteredProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onDelete={() => confirmDelete(product.id)}
            onQuantityChange={handleQuantity}
            onEdit={handleEdit}
          />
        ))
      )}

      {/* CONFIRMATION DIALOG */}
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
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ProductList;
