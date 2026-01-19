import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addProduct } from "../services/api";

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = await addProduct(form);
    setProducts([...products, newProduct]);

    showToast("✅ Product added successfully", "success");

    setForm({ name: "", quantity: "", price: "", image: "" });
    nameRef.current.focus();

    navigate("/admin/productlist");
  };

  return (
    <div
      className="
        bg-white rounded-xl shadow-md
        p-4 sm:p-6
        mx-3 sm:mx-0
      "
    >
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-center sm:text-left">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRODUCT NAME */}
        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">
            Product Name
          </label>
          <input
            ref={nameRef}
            name="name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full border rounded-md
              px-3 py-2 sm:py-2.5
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
          {errors.name && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* QUANTITY */}
        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="
              w-full border rounded-md
              px-3 py-2 sm:py-2.5
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.quantity}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="
              w-full border rounded-md
              px-3 py-2 sm:py-2.5
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
          {errors.price && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.price}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="
              w-full border rounded-md
              px-3 py-2 bg-white
              text-sm sm:text-base
            "
          />
          {errors.image && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.image}
            </p>
          )}
        </div>

        {/* IMAGE PREVIEW */}
        {form.image && (
          <div className="mt-4">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              Image Preview
            </p>
            <img
              src={form.image}
              alt="preview"
              className="
                w-full max-h-56 sm:max-h-64
                object-cover rounded-md border
              "
            />
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            w-full bg-green-600 text-white
            py-2.5 sm:py-3
            rounded-md font-medium
            hover:bg-green-700 transition
          "
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

ProductForm.propTypes = {
  products: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ProductForm;
