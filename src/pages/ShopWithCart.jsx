import PropTypes from "prop-types";
import ProductCardShop from "../components/ProductCardShop";

function ShopWithCart({ products, cart, setCart, showToast }) {

  // ADD TO CART
  const addToCart = (product, qty) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }

    showToast("🛒 Added to cart", "success");
  };

  // REMOVE FROM CART
  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
    showToast("❌ Removed from cart", "info");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page shop-layout">
      {/* PRODUCTS SECTION */}
      <div className="shop-products">
        <h2>Products</h2>

        <div className="shop-grid">
          {products.map(product => (
            <ProductCardShop
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* CART SECTION */}
      <div className="shop-cart">
        <h2>Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>

                  <button
                    className="delete-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>
          </>
        )}
      </div>
    </div>
  );
}

ShopWithCart.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default ShopWithCart;
