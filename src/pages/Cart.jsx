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
    <div className="min-h-screen bg-gray-50 px-3 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        /* EMPTY CART */
        <div className="w-full mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-5xl mb-6">🛒</div>
          <h3 className="text-xl font-semibold mb-8">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-8">
            Add some fresh fruits to start shopping.
          </p>

          <Link to="/products">
            <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
              Go Product Page
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* CART LIST */}
          <div className="max-w-5xl mx-auto space-y-4">
            {cart.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded self-center sm:self-start"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-lg">
                    {item.name}
                  </h4>
                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                      className="px-4 py-2 border rounded-md disabled:opacity-50"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-4 py-2 border rounded-md"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* SUBTOTAL */}
                <div className="text-right font-semibold text-lg sm:self-center">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold">
              Total: ₹{total}
            </h3>

            <Link to="/cart/checkout" className="w-full sm:w-auto">
              <button className="w-full bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition">
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
