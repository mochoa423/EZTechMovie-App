<<<<<<< HEAD
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-title">EZTechMovie</div>
      <div className="nav-icons">
        <NavLink to="/" className="nav-item">
          <img src="/assets/star.svg" alt="Home" />
        </NavLink>
        <NavLink to="/movies" className="nav-item">
          <img src="/assets/tv.svg" alt="Movies" />
        </NavLink>
        <NavLink to="/cart" className="nav-item">
          <img src="/assets/cart.svg" alt="Cart" />
        </NavLink>
        <NavLink to="/about" className="nav-item">
          <img src="/assets/person.svg" alt="About" />
        </NavLink>
      </div>
    </nav>
=======
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import cart context

const Navigation = () => {
  const { cartItems } = useContext(CartContext); // Access cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Count total items

  return (
    <div className="nav-wrapper">
      <nav className="nav-bar">
        <div className="nav-title">EZTechMovie</div>
        <div className="nav-icons">
          <NavLink to="/" className="nav-item">
            <img src="/assets/star.svg" alt="Home" />
          </NavLink>
          <NavLink to="/movies" className="nav-item">
            <img src="/assets/tv.svg" alt="Movies" />
          </NavLink>
          <NavLink to="/cart" className="nav-item">
            <div className="nav-cart-icon">
              <img src="/assets/cart.svg" alt="Cart" />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/about" className="nav-item">
            <img src="/assets/person.svg" alt="About" />
          </NavLink>
        </div>
      </nav>
    </div>
>>>>>>> 2e9bc5e (Added Page Adjustments, Credit Card Security, Credit Card Form, Etc.)
  );
};

export default Navigation;
