import { useState } from "react";
import PropTypes from "prop-types";

function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [error, setError] = useState("");

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (name.trim().length < 3) {
      setError("Product name must be at least 3 characters");
      return;
    }

    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (price <= 1) {
      setError("Price must be greater than 1");
      return;
    }

    setError("");

    onSave({
      ...product,
      name,
      quantity,
      price,
      image
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

        {/* TITLE */}
        <h3 className="text-xl font-bold mb-4 text-center">
          ✏️ Edit Product
        </h3>

        {/* NAME */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* QUANTITY */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* PRICE */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* IMAGE */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md px-3 py-2 bg-white"
          />
        </div>

        {/* IMAGE PREVIEW */}
        {image && (
          <img
            src={image}
            alt="preview"
            className="w-full h-40 object-cover rounded-md border mb-3"
          />
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            💾 Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

EditProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EditProductModal;
