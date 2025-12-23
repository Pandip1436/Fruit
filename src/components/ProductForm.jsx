import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../pages/css/ProductForm.css";


function ProductForm({ products, setProducts, showToast }) {
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    image: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (form.quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0";
    if (form.price <= 1)
      newErrors.price = "Price must be greater than 1";
    if (!form.image)
      newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
      image: form.image
    };

    setProducts([...products, newProduct]);

    //  TOAST
    showToast("✅ Product added successfully", "success");

    // RESET FORM
    setForm({ name: "", quantity: "", price: "", image: "" });
    nameRef.current.focus();

    //  REDIRECT TO PRODUCT LIST
    navigate("/admin/productlist");
  };

  return (
    <form className="product-form-card" onSubmit={handleSubmit}>
      <label>Product Name</label>
      <input
        ref={nameRef}
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <small className="error">{errors.name}</small>}

      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      {errors.quantity && <small className="error">{errors.quantity}</small>}

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
      />
      {errors.price && <small className="error">{errors.price}</small>}

      <label>Product Image</label>
      <input type="file" accept="image/*" onChange={handleImage} />
      {errors.image && <small className="error">{errors.image}</small>}

      {form.image && (
        <img src={form.image} alt="preview" className="product-img-newww" />
      )}

      <button type="submit">Add Product</button>
    </form>
  );
}

ProductForm.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ProductForm;
