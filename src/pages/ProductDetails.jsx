import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ProductDetails({ products, cart, setCart, showToast }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  const addToCart = () => {
    setCart([...cart, { ...product, quantity: 1 }]);
    showToast("🛒 Added to cart", "success");
  };

  return (
    <div className="page">
      <img src={product.image} alt={product.name} className="details-img" />

      <h2>{product.name}</h2>
      <h3>₹{product.price}</h3>
      <p>Available: {product.quantity}</p>

      <button className="shop-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ProductDetails;
