import { useState } from "react";
import PropTypes from "prop-types";
import EditProductModal from "./EditProductModal";

function ProductItem({ product, onDelete, onQuantityChange, onEdit }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="product-card-new">
        <img
          src={product.image}
          alt={product.name}
          className="product-img-new"
        />

        <div className="product-details">
          <div className="product-header">
            <h4>{product.name}</h4>
            <span className="price">₹{product.price}</span>
          </div>

          <p className="qty">Quantity: {product.quantity} Kg</p>

          <div className="product-actions-new">
            <button onClick={() => onQuantityChange(product.id, +1)}>➕</button>
            <button
              onClick={() =>
                product.quantity > 0 &&
                onQuantityChange(product.id, -1)
              }
            >
              ➖
            </button>

            <button className="edit-btn" onClick={() => setShowModal(true)}>
              ✏ Edit
            </button>

            <button className="delete-btn" onClick={onDelete}>
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onSave={updatedProduct => {
            onEdit(updatedProduct);
            setShowModal(false);
            
          }}
        />
      )}
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ProductItem;
