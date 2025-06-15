import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CreditCardForm from "./CreditCardForm";

const Cart = () => {
  const {
    cartItems,
    warning,
    removeFromCart,
    updateQuantity,
    getTotal,
    setWarning,
    setCartItems,
  } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); // Get user info

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setWarning("Add something to cart to checkout.");
      return;
    }

    if (!user) {
      setWarning("Please log in before checking out.");
      return;
    }

    setShowModal(true);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setPaymentSuccess(true);
  };

  return (
    <div className="page cart-wrapper">
      <div className="cart-box">
        <div className="cart-header">
          <h1>Cart</h1>
          {warning && <p className="warning">{warning}</p>}
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.img}
                    alt={item.name || item.service}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <strong className="cart-item-title">
                      {item.name || item.service}
                    </strong>
                    <div className="cart-quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ marginLeft: "1rem" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cart-total">
          <h3>Total: ${getTotal()}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          {paymentSuccess && (
            <p className="success" style={{ color: "black", marginTop: "1rem" }}>
              Payment processed! Your order is complete.
            </p>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <CreditCardForm
                onClose={() => setShowModal(false)}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
