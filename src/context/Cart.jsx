import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    warning,
    removeFromCart,
    updateQuantity,
    getTotal,
  } = useContext(CartContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(cartItems[index].name);
  };

  const handleUpdate = (index) => {
    if (!editValue.trim()) return;

    const updatedItem = {
      ...cartItems[index],
      name: editValue,
    };

    updateQuantity(updatedItem.id, updatedItem.quantity); // this just triggers re-render
    setEditIndex(null);
    setEditValue("");
  };

  const handleCheckout = () => {
    alert("Checkout successful! 🎉 (This is a demo.)");
    // Optional: clearCart();
  };

  return (
    <div className="page cart-section">
      <div className="cart-header">
        <h1>Cart</h1>
        {warning && <p className="warning">{warning}</p>}
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item, index) => (
              <li key={item.id} className="cart-item">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="cart-item-name"
                    />
                    <div className="cart-item-actions">
                      <button onClick={() => handleUpdate(index)}>Save</button>
                      <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cart-item-name">
                      <strong>{item.name}</strong>
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
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </>
                )}
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
      </div>
    </div>
  );
};

export default Cart;
