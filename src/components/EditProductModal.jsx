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

  // clear error if everything is valid
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
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Product</h3>

        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />

        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {image && (
          <img src={image} alt="preview" className="modal-img" />
        )}
        {error && (
          <p style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>{error} </p> )}


        <div className="modal-actions">
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={onClose}>❌ Cancel</button>
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
