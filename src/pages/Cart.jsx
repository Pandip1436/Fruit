import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Cart({ cart, setCart, showToast }) {
  const increaseQty = id => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
    showToast("❌ Item removed from cart", "info");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart-ui">
            <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some fresh fruits to start shopping.</p>
                <Link to="/">
                   <button className="checkout-btn">
                      Go Product Page
                    </button>
                </Link>
        </div>

      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-img"
                />

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="cart-price">₹{item.price}</p>

                  <div className="cart-qty">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-subtotal">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>

            <Link to="/cart/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
            
          </div>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default Cart;
