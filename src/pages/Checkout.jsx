import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      user: user.email,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      payment: paymentMethod,   // ✅ ADDED
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    setCart([]);
    navigate("/orders");
  };

  return (
    <div className="page checkout-page">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <div className="empty-checkout">
          <div className="empty-icon">🛒</div>
          <h3>No items to checkout</h3>
          <p>Your cart is empty. Add some fresh fruits to continue.</p>
          <Link to="/">
            <button className="checkout-btn">Go Product Page</button>
          </Link>
        </div>
      ) : (
        <>
          {/* PRODUCT SUMMARY */}
          <div className="checkout-summary">
            <h3>Product Summary</h3>

            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-img"
                />

                <div className="checkout-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>

                <div className="checkout-price">
                  <p>₹{item.price}</p>
                  <p className="subtotal">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PAYMENT METHOD */}
          <div className="payment-section">
            <h3>Payment Method</h3>

            {error && <p className="error">{error}</p>}

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Card Payment"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              Card Payment
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              UPI
            </label>

            {/* CARD FORM (MOCK) */}
            {paymentMethod === "Card Payment" && (
              <div className="card-form">
                <input placeholder="Card Number" maxLength="16" />
                <div className="card-row">
                  <input placeholder="MM/YY" />
                  <input placeholder="CVV" maxLength="3" />
                </div>
                <input placeholder="Card Holder Name" />
                <p className="mock-note">🔒 This is a demo card form</p>
              </div>
            )}

            {/* UPI QR PREVIEW */}
            {paymentMethod === "UPI" && (
              <div className="upi-box">
                <p>Scan QR using any UPI app</p>
                <img
                  src="/src/assets/qr.jpeg"
                  
                />
                <p className="mock-note">UPI ID: myfruitsshop@upi</p>
              </div>
            )}
          </div>


          {/* TOTAL */}
          <div className="checkout-total">
            <h3>Total Amount: ₹{total}</h3>
            <button className="place-order-btn" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
};

export default Checkout;
