import { useState } from "react";
import PropTypes from "prop-types";
import EditProductModal from "./EditProductModal";

function ProductItem({ product, onDelete, onQuantityChange, onEdit }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* PRODUCT CARD */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* DETAILS */}
        <div className="p-4">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h4>
            <span className="text-green-600 font-bold">
              ₹{product.price}
            </span>
          </div>

          <p className="text-gray-600 mb-4">
            Quantity: <span className="font-medium">{product.quantity}</span> Kg
          </p>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">
            {/* INCREASE */}
            <button
              onClick={() => onQuantityChange(product._id, +1)}
              className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
              title="Increase quantity"
            >
              ➕
            </button>

            {/* DECREASE */}
            <button
              onClick={() =>
                product.quantity > 0 &&
                onQuantityChange(product._id, -1)
              }
              className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
              title="Decrease quantity"
            >
              ➖
            </button>

            {/* EDIT */}
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              ✏ Edit
            </button>

            {/* DELETE */}
            <button
              onClick={onDelete}
              className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onSave={updatedProduct => {
            onEdit({
              ...updatedProduct,
              _id: product._id // ✅ ensure ID preserved
            });
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
