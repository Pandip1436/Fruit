import PropTypes from "prop-types";
import "../pages/css/ProductCardShop.css"

function ProductCardShop({ product, onAddToCart }) {
  return (
    <div className="shop-card-ui">
      <div className="shop-img-wrap">
        {product.quantity === 0 && (
          <span className="stock-badge">Out of Stock</span>
        )}
        <img src={product.image} alt={product.name} />
      </div>

      <div className="shop-content">
        <h4>{product.name}</h4>

        <div className="shop-meta">
          <span className="price">₹{product.price}</span>
          <span className="stock">Stock: {product.quantity} kg</span>
        </div>

        <button
          className="add-cart-btn"
          disabled={product.quantity === 0}
          onClick={() => onAddToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCardShop.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCardShop;
